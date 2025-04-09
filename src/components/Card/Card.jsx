import { useContext } from 'react'
import { Card, Flex, Progress, Tag, Typography } from 'antd'
import defaultPoster from '../../assets/defaultPoster.jpg'
import './Card.css'
import { formatDate, sliceText } from '../../services/utils'
import MovieServiceContext from '../../context/MovieServiceContext'

const { Title, Text, Paragraph } = Typography

export default function MovieCard({ card }) {
  const genresList = useContext(MovieServiceContext)
  const genres = card.genres && genresList.filter((genre) => card.genres.includes(genre.id))

  let ratingColor
  if (card.rating >= 7) {
    ratingColor = '#66E900'
  } else if (card.rating >= 5) {
    ratingColor = '#E9D100'
  } else if (card.rating >= 3) {
    ratingColor = '#E97E00'
  } else {
    ratingColor = '#E90000'
  }
  return (
    <Card
      hoverable
      className="card"
      classNames={{
        body: 'card__body',
      }}
    >
      <Flex justify="space-between" className="card__body">
        <img
          alt="poster"
          src={card.posterImageUrl || defaultPoster}
          onError={(e) => {
            e.currentTarget.src = defaultPoster
          }}
          className="card__image"
        />
        <div className="card__content">
          <div className="card__header">
            <Title level={2} className="card__title">
              {card.title}
            </Title>
            <Progress
              type="circle"
              percent={card.rating * 10}
              format={() => card.rating.toFixed(1)}
              size={40}
              className="card__rating"
              strokeColor={ratingColor}
            />
          </div>
          <Flex vertical justify="flex-start" align="flex-start" gap={7} className="card__info">
            <Text type="secondary">{formatDate(card.releaseDate)}</Text>
            <Flex wrap gap="8px 0" className="card__tags">
              {genres && genres.map((genre) => <Tag key={genre.id}>{genre.name}</Tag>)}
            </Flex>
            <Paragraph className="card__description">{sliceText(card.description)}</Paragraph>
          </Flex>
        </div>
      </Flex>
    </Card>
  )
}
