import { useEffect, useState } from 'react'
import { Alert, Spin } from 'antd'
import './App.css'
import CardsList from './components/CardsList/CardsList'
import MovieService from './api/MovieService'
import useFetching from './hooks/useFetching'

function App() {
  const [cards, setCards] = useState([])

  const api = new MovieService()

  async function fetchCards() {
    const movies = await api.searchMovies('the way back', true)
    setCards(movies)
  }

  const [fetchingCards, isLoading, error] = useFetching(fetchCards)

  useEffect(() => {
    fetchingCards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container">
      {error && <Alert message={error} type="error" showIcon />}
      {isLoading && <Spin size="large" />}
      {!isLoading && <CardsList cards={cards} />}
    </div>
  )
}
export default App
