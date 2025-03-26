import { Alert } from 'antd'
import Card from '../Card/Card'
import './CardsList.css'

export default function CardsList({ cards, totalCards, error }) {
  if (error) {
    return <Alert message={error} type="error" showIcon />
  }

  return !totalCards ? (
    <Alert message="No movies found" type="info" showIcon />
  ) : (
    <div className="cards">
      {cards.map((result) => (
        <Card key={result.id} card={result} />
      ))}
    </div>
  )
}
