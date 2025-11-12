'use client'

import { useParams, useRouter } from 'next/navigation'
import { Title, Text, Button, Card, Image } from '@telegram-apps/telegram-ui'
import { ArrowLeft } from 'lucide-react'

const toys = [
  {
    id: 1,
    name: 'Зайчик в шапке',
    price: 1200,
    description:
      'Мягкий вязаный зайчик в зимней шапочке с помпоном. Сделан вручную из гипоаллергенной пряжи.',
    images: ['/1600.jpg', '/1600.jpg', '/1600.jpg'],
  },
  {
    id: 2,
    name: 'Медвежонок Тедди',
    price: 1500,
    description:
      'Классический мишка Тедди — символ уюта и детства. Отличный подарок для любого возраста.',
    images: ['/1600.jpg', '/1600.jpg'],
  },
  {
    id: 3,
    name: 'Котик-мурчик',
    price: 1300,
    description:
      'Очаровательный котик с шарфиком. Мягкий, уютный и очень пушистый друг.',
    images: ['/1600.jpg'],
  },
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const product = toys.find((t) => t.id === Number(params.id))

  if (!product) {
    return <Text>Товар не найден 😿</Text>
  }

  return (
    <div
      style={{
        padding: 16,
        minHeight: '100vh',
        backgroundColor: 'var(--tg-theme-bg-color)',
        color: 'var(--tg-theme-text-color)',
      }}
    >
      {/* Назад */}
      <div
        onClick={() => router.back()}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          cursor: 'pointer',
          marginBottom: 12,
        }}
      >
        <ArrowLeft size={18} />
        <Text>Назад в каталог</Text>
      </div>

      {/* Название */}
      <Title level="1">{product.name}</Title>

      {/* Галерея */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginTop: 12,
          overflowX: 'auto',
        }}
      >
        {product.images.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={product.name}
            width={180}
            height={180}
            style={{
              borderRadius: 12,
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Описание */}
      <Card
        style={{
          marginTop: 16,
          padding: 16,
          background: 'var(--tg-theme-secondary-bg-color)',
        }}
      >
        <Text>{product.description}</Text>
        <Text style={{ marginTop: 12, fontSize: 18, fontWeight: 600 }}>
          💰 {product.price} ₽
        </Text>

        <Button
          size="l"
          mode="bezeled"
          style={{ marginTop: 16, width: '100%' }}
          onClick={() => alert('Товар добавлен в корзину!')}
        >
          Добавить в корзину
        </Button>
      </Card>
    </div>
  )
}
