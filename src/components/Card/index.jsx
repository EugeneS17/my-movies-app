import { useContext, useState } from 'react'
import { Card, Progress, Rate, Tag, Typography } from 'antd'
import defaultPoster from '../../assets/defaultPoster.jpg'
import './Card.css'
import { formatDate, sliceText } from '../../services/utils'
import MovieServiceContext from '../../context/MovieServiceContext'

const { Title, Text, Paragraph } = Typography

export default function MovieCard({ card }) {
  const { api, genres: genresList, sessionId } = useContext(MovieServiceContext)
  const genres = card.genres && genresList.filter((genre) => card.genres.includes(genre.id))
  const [rate, setRate] = useState(card.rate)

  const cardRatingAvg = card.rating.toFixed(1)

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

  const formattedDate = formatDate(card.releaseDate)

  function handleChangeRate(value) {
    if (value) {
      api.rateMovie(card.id, value, sessionId)
    } else {
      api.unrateMovie(card.id, sessionId)
    }
    setRate(value)
  }

  return (
    <Card
      hoverable
      className="card"
      classNames={{
        body: 'card__body',
      }}
    >
      <img
        alt="poster"
        src={card.posterImageUrl || defaultPoster}
        onError={(e) => {
          e.currentTarget.src = defaultPoster
        }}
        className="card__image"
      />
      <div className="card__header">
        <div className="card__header-top">
          <Title level={2} className="card__title">
            {card.title}
          </Title>
          <Progress
            type="circle"
            percent={card.rating * 10}
            format={() => cardRatingAvg}
            size={40}
            className="card__rating"
            strokeColor={ratingColor}
          />
        </div>
        <Text type="secondary">{formattedDate}</Text>
        <div className="card__tags">{genres && genres.map((genre) => <Tag key={genre.id}>{genre.name}</Tag>)}</div>
      </div>
      <div className="card__info">
        <Paragraph className="card__description">{sliceText(card.description)}</Paragraph>
        <Rate allowHalf count={10} value={rate} className="card__rate" onChange={(value) => handleChangeRate(value)} />
      </div>
    </Card>
  )
}
