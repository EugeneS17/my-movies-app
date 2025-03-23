import { Card, Flex, Tag, Typography } from 'antd'
import defaultPoster from '../../assets/defaultPoster.jpg'
import './Card.css'
import { formatDate, sliceText } from '../../services/utils'

const { Title, Text, Paragraph } = Typography

export default function MovieCard({ card }) {
  return (
    <Card
      hoverable
      className="card"
      classNames={{
        body: 'card__body',
      }}
    >
      <Flex justify="space-between" className="card__body">
        <img alt="poster" src={card.posterImageUrl || defaultPoster} className="card__image" />
        <Flex vertical justify="flex-start" align="flex-start" gap={7} className="card__content">
          <Title level={2} className="card__title">
            {card.title}
          </Title>
          <Text type="secondary">{formatDate(card.releaseDate)}</Text>
          <Flex wrap gap="8px 0" className="card__tags">
            {card.genres && card.genres.map((genre) => <Tag key={genre.id}>{genre.name}</Tag>)}
          </Flex>
          <Paragraph className="card__description">{sliceText(card.description)}</Paragraph>
        </Flex>
      </Flex>
    </Card>
  )
}
