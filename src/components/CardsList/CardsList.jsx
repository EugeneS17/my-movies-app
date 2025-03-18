import { Flex } from 'antd'
import Card from '../Card/Card'

export default function CardsList({ cards }) {
  return (
    <Flex wrap gap={20}>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </Flex>
  )
}
