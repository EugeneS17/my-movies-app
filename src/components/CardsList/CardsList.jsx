import { Alert, Flex } from 'antd'
import Card from '../Card/Card'

export default function CardsList({ cards, error }) {
  if (!cards) return
  if (error) {
    return <Alert message={error} type="error" showIcon />
  }

  return cards.length === 0 ? (
    <Alert message="No movies found" type="info" showIcon />
  ) : (
    <Flex wrap gap={30}>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </Flex>
  )
}
