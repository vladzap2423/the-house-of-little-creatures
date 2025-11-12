'use client'

import { Card, Text, Title, Button, Image } from '@telegram-apps/telegram-ui'
import { useRouter } from 'next/navigation'

type Toy = {
  id: number
  name: string
  description: string
  price: number
}

const toys: Toy[] = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  name: `Игрушка №${i + 1}`,
  description: 'Очаровательная вязаная игрушка, сделанная вручную с любовью 💕',
  price: 1000 + i * 50,
}))

export default function Catalog() {
  const router = useRouter()

  return (
    <div style={{ padding: 16 }}>
      <Title level="1">🧶 Вязаные игрушки</Title>

      <div style={{ marginTop: 16 }}>
        {toys.map((toy) => (
          <Card
            key={toy.id}
            onClick={() => router.push(`/catalog/${toy.id}`)}
            style={{
              marginBottom: 12,
              padding: 8,
              background: 'var(--tg-theme-secondary-bg-color)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.01)'
              ;(e.currentTarget as HTMLElement).style.boxShadow =
                '0 4px 10px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.0)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <Image
                src="/1600.jpg"
                alt={toy.name}
                width={160}
                height={160}
                style={{
                  borderRadius: 8,
                  objectFit: 'cover',
                }}
              />
              <div style={{ flex: 1 }}>
                <Title level="3">{toy.name}</Title>
                <Text weight="2" style={{ color: 'var(--tg-theme-hint-color)' }}>
                  {toy.description}
                </Text>
                <div style={{ marginTop: 4 }}>
                  <Text
                    weight="2"
                    style={{ color: 'var(--tg-theme-text-color)' }}
                  >
                    💰 {toy.price} ₽
                  </Text>
                </div>
                <div style={{ marginTop: 8 }}>
                  <Button
                    mode="bezeled"
                    size="s"
                    onClick={(e) => {
                      e.stopPropagation() // предотвращаем переход при клике на кнопку
                      alert(`Товар "${toy.name}" добавлен в корзину!`)
                    }}
                  >
                    Купить
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
