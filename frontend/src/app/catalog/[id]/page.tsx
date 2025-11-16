'use client'

import { useParams } from 'next/navigation'
import { Title, Text, Button, Image } from '@telegram-apps/telegram-ui'
import { Product } from '@/types/product'
import { useState } from 'react'

// Пока без API
const mock: Record<string, Product> = {
  '1': {
    id: 1,
    name: 'Зайчик Мятный',
    description:
      'Мягкий, лёгкий, пастельный зайчик, связанный из гипоаллергенной пряжи. Высота 15 см. Отлично подходит в подарок.',
    price: 1200,
    available: true,
    images: ['/toys/toy1-1.jpg', '/toys/toy1-2.jpg'],
  },
  '2': {
    id: 2,
    name: 'Амигуруми Котёнок',
    description:
      'Очень маленький и необычно тёплый котёнок. Связан вручную. Высота 10 см.',
    price: 900,
    available: true,
    images: ['/toys/toy2-1.jpg', '/toys/toy2-2.jpg'],
  },
}

export default function ProductPage() {
  const { id } = useParams()
  const product = mock[id as string]

  const [current, setCurrent] = useState(0)

  return (
    <div style={{ padding: 16 }}>
      <Title level="1">{product.name}</Title>

      {/* Фотолента */}
      <div
        style={{
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          margin: '12px 0',
        }}
      >
        {product.images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={product.name}
            style={{
              width: 260,
              height: 260,
              objectFit: 'cover',
              borderRadius: 12,
              marginRight: 12,
              display: 'inline-block',
              border: index === current ? '2px solid #8B5CF6' : 'none',
            }}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      <Text style={{ opacity: 0.85 }}>{product.description}</Text>

      <div style={{ marginTop: 16 }}>
        {product.available ? (
          <Text weight="2" style={{ color: '#16a34a' }}>
            В наличии ✔
          </Text>
        ) : (
          <Text weight="2" style={{ color: '#dc2626' }}>
            Нет в наличии
          </Text>
        )}
      </div>

      <Text weight="2" style={{ fontSize: 20, marginTop: 12 }}>
        {product.price} ₽
      </Text>

      <Button
        size="l"
        mode="bezeled"
        style={{ marginTop: 24 }}
        onClick={() => { }}
      >
        Добавить в корзину
      </Button>
    </div>
  )
}
