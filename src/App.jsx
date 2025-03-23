import { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { Alert, Spin } from 'antd'
import './App.css'
import CardsList from './components/CardsList/CardsList'
import MovieService from './api/MovieService'
import useFetching from './hooks/useFetching'
import Search from './components/Search/Search'
import Pagination from './components/Pagination/Pagination'

const api = new MovieService()

function App() {
  const [cardsData, setCardsData] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const trimmedQuery = query.trim()

  async function fetchCards() {
    const movies = await api.searchMovies(query, page)
    setCardsData(movies)
  }

  const [fetchingCards, isCardsLoading, setIsCardsLoading, fetchCardsError] = useFetching(fetchCards)
  const debouncedFetchingCards = debounce(fetchingCards, 500)

  function onSearch() {
    if (!query) {
      setCardsData([])
      return
    }
    setIsCardsLoading(true)
    debouncedFetchingCards()
    return () => {
      debouncedFetchingCards.cancel()
      setIsCardsLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onSearch, [trimmedQuery, page])

  useEffect(() => {
    setPage(1)
  }, [trimmedQuery])

  return (
    <div className="container">
      <Search query={query} setQuery={setQuery} />
      {!query && !isCardsLoading && <Alert message="Type to search..." type="info" showIcon />}
      {isCardsLoading && <Spin size="large" />}
      {query && !isCardsLoading && <CardsList cards={cardsData.results} error={fetchCardsError} />}
      <Pagination page={page} totalResults={cardsData.totalResults} onChangePage={setPage} />
    </div>
  )
}
export default App
