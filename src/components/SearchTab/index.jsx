import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { Alert, Spin } from 'antd'
import MovieServiceContext from '../../context/MovieServiceContext'
import './SearchTab.css'
import Search from '../Search'
import CardsList from '../CardsList'
import Pagination from '../Pagination'

export default function SearchTab() {
  const { api } = useContext(MovieServiceContext)
  const [cards, setCards] = useState([])
  const [totalCards, setTotalCards] = useState(null)
  const [query, setQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const [isCardsLoading, setIsCardsLoading] = useState(false)
  const [fetchError, setFetchError] = useState(null)

  function handleSearch(value) {
    setQuery(value)
    setSearchQuery(value.trim())
    setPage(1)
  }

  const debouncedFetchCards = useMemo(
    () =>
      debounce(async () => {
        try {
          setFetchError(null)
          const queryToSearch = searchQuery || 'return'
          const { results, totalResults } = await api.searchMovies(queryToSearch, page)
          setCards(results)
          setTotalCards(totalResults)
        } catch (e) {
          setFetchError(e.message)
        } finally {
          setIsCardsLoading(false)
        }
      }, 500),
    [api, searchQuery, page]
  )

  const fetchSearchResults = useCallback(() => {
    setIsCardsLoading(true)
    debouncedFetchCards()
    return () => {
      debouncedFetchCards.cancel()
      setCards([])
      setIsCardsLoading(false)
    }
  }, [debouncedFetchCards])

  useEffect(fetchSearchResults, [fetchSearchResults])

  return (
    <div className="search-tab">
      <Search query={query} onSearch={(v) => handleSearch(v)} />
      {!query && !isCardsLoading && <Alert message="Type to search..." type="info" showIcon />}
      {isCardsLoading && <Spin size="large" />}
      {!isCardsLoading && (
        <>
          <CardsList cards={cards} totalCards={totalCards} error={fetchError} />
          {!fetchError && totalCards > 0 && <Pagination page={page} totalResults={totalCards} onPageChange={setPage} />}
        </>
      )}
    </div>
  )
}
