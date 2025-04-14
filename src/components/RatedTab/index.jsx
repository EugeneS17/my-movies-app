import { useContext, useEffect, useState } from 'react'
import { Spin } from 'antd'
import MovieServiceContext from '../../context/MovieServiceContext'
import './RatedTab.css'
import CardsList from '../CardsList'
import Pagination from '../Pagination'

export default function RatedTab() {
  const { api, sessionId } = useContext(MovieServiceContext)
  const [cards, setCards] = useState([])
  const [totalCards, setTotalCards] = useState(null)
  const [page, setPage] = useState(1)

  const [isCardsLoading, setIsCardsLoading] = useState(false)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        setIsCardsLoading(true)
        setFetchError(null)
        const { results, totalResults } = await api.getRatedMovies(sessionId, page)
        setCards(results)
        setTotalCards(totalResults)
      } catch (e) {
        setFetchError(e.message)
      } finally {
        setIsCardsLoading(false)
      }
    }

    fetchSearchResults()

    return () => {
      setCards([])
    }
  }, [api, page, sessionId])

  return (
    <div className="rated-tab">
      {isCardsLoading && <Spin size="large" />}
      {!isCardsLoading ? (
        <>
          <CardsList cards={cards} totalCards={totalCards} error={fetchError} />
          {!fetchError && <Pagination page={page} totalResults={totalCards} onPageChange={setPage} />}
        </>
      ) : null}
    </div>
  )
}
