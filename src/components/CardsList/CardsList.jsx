import { Alert, Flex } from 'antd'
import Card from '../Card/Card'

export default function CardsList({ cards, totalCards, error }) {
  if (error) {
    return <Alert message={error} type="error" showIcon />
  }

  return !totalCards ? (
    <Alert message="No movies found" type="info" showIcon />
  ) : (
    <Flex wrap gap={30}>
      {cards.map((result) => (
        <Card key={result.id} card={result} />
      ))}
    </Flex>
  )
}
