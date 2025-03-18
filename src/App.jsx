import { useEffect, useState } from 'react'
import './App.css'
import CardsList from './components/CardsList/CardsList'
import MovieService from './api/MovieService'

function App() {
  const [cards, setCards] = useState([])

  useEffect(() => {
    const api = new MovieService()
    async function fetchCards() {
      const movies = await api.searchMovies('return')
      setCards(movies.results)
    }
    fetchCards()
  }, [])

  return (
    <div className="app">
      <div className="container">
        <CardsList cards={cards} />
      </div>
    </div>
  )
}

export default App
