import { Alert } from 'antd'
import Card from '../Card'
import './CardsList.css'

export default function CardsList({ cards, totalCards, error }) {
  if (error) {
    return <Alert message={error} type="error" showIcon className="alert" />
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
