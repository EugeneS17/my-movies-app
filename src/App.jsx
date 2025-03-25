import { useCallback, useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { Alert, Spin } from 'antd'
import './App.css'
import CardsList from './components/CardsList/CardsList'
import MovieService from './api/MovieService'
import Search from './components/Search/Search'
import Pagination from './components/Pagination/Pagination'

const api = new MovieService()

function App() {
  const [cards, setCards] = useState([])
  const [totalCards, setTotalCards] = useState(null)
  const [query, setQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const [isCardsLoading, setIsCardsLoading] = useState(false)
  const [cardsError, setCardsError] = useState(null)

  const debouncedFetchCards = useMemo(
    () =>
      debounce(async () => {
        try {
          setCardsError(null)
          const { results, totalResults } = await api.searchMovies(searchQuery, page)
          setCards(results)
          setTotalCards(totalResults)
        } catch (e) {
          setCardsError(e.message)
        } finally {
          setIsCardsLoading(false)
        }
      }, 500),
    [searchQuery, page]
  )

  const fetchSearchResults = useCallback(() => {
    if (!searchQuery) {
      return
    }
    setIsCardsLoading(true)
    debouncedFetchCards()
    return () => {
      debouncedFetchCards.cancel()
      setCards([])
      setIsCardsLoading(false)
    }
  }, [searchQuery, debouncedFetchCards])

  useEffect(fetchSearchResults, [fetchSearchResults])

  function handleSearch(value) {
    setQuery(value)
    setSearchQuery(value.trim())
    setPage(1)
  }

  return (
    <div className="container">
      <Search query={query} onSearch={(v) => handleSearch(v)} />
      {!searchQuery && !isCardsLoading && <Alert message="Type to search..." type="info" showIcon />}
      {isCardsLoading && <Spin size="large" />}
      {/* {console.log(cards)} */}
      {searchQuery && !isCardsLoading ? (
        <>
          <CardsList cards={cards} totalCards={totalCards} error={cardsError} />
          <Pagination page={page} totalResults={totalCards} onPageChange={setPage} />
        </>
      ) : null}
    </div>
  )
}
export default App
