import { Card, Flex, Tag, Typography } from 'antd'
import './Card.css'

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
        <img
          alt="poster"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          className="card__image"
        />
        <Flex vertical justify="flex-start" align="flex-start" gap={7} className="card__content">
          <Title level={2} className="card__title">
            {card.title}
          </Title>
          <Text type="secondary">{card.release_date}</Text>
          <Flex wrap gap="8px 0" className="card__tags">
            <Tag>Action</Tag>
            <Tag>Action</Tag>
          </Flex>
          <Paragraph className="card__description">{card.overview}</Paragraph>
        </Flex>
      </Flex>
    </Card>
  )
}
