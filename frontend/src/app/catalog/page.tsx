'use client'

import { Title } from '@telegram-apps/telegram-ui'
import ProductCard from '@/components/catalog/product'
import { Product } from '@/types/product'

const products: Product[] = [
  {
    id: 1,
    name: 'Зайчик Мятный',
    description: 'Мягкий вязаный зайчик в пастельных тонах.',
    price: 1200,
    available: true,
    images: ['/toys/toy1-1.jpg'],
  },
  {
    id: 2,
    name: 'Амигуруми Котёнок',
    description: 'Крошечный котёнок для души и уюта.',
    price: 900,
    available: true,
    images: ['/toys/toy2-1.jpg'],
  },
]

export default function Catalog() {
  return (
    <div style={{ padding: 16 }}>
      <Title level="1" style={{ marginBottom: 16 }}>
        🧶 Вязаные игрушки
      </Title>

      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
