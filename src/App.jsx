import { useEffect, useMemo, useState } from 'react'
import { Tabs } from 'antd'
import './App.css'
import MovieService from './api/MovieService'
import MovieServiceContext from './context/MovieServiceContext'
import SearchTab from './components/SearchTab'
import RatedTab from './components/RatedTab'

function App() {
  const api = useMemo(() => new MovieService(), [])
  const [sessionId, setSessionId] = useState(null)
  const [genres, setGenres] = useState([])
  const [, setFetchError] = useState(null)

  useEffect(() => {
    async function fetchGenres() {
      try {
        const data = await api.getMovieGenres()
        setGenres(data)
      } catch (e) {
        setFetchError(e.message)
      }
    }

    async function getSessionId() {
      try {
        const id = await api.createGuestSession()
        setSessionId(id)
      } catch (e) {
        setFetchError(e.message)
      }
    }

    fetchGenres()
    getSessionId()
  }, [api])

  const tabs = [
    {
      key: '1',
      label: 'Search',
      children: <SearchTab />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedTab />,
      destroyInactiveTabPane: true,
    },
  ]

  const context = useMemo(() => ({ api, genres, sessionId }), [api, genres, sessionId])

  return (
    <div className="container">
      <MovieServiceContext.Provider value={context}>
        <Tabs defaultActiveKey="1" items={tabs} className="tabs" centered tabBarStyle={{ marginInline: 'auto' }} />
      </MovieServiceContext.Provider>
    </div>
  )
}

export default App
