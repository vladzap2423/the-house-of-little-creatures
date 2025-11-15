'use client'

import { Title, Text, Card, Button, Image } from '@telegram-apps/telegram-ui'


export default function CartPage() {

  return (
    <div
      style={{
        padding: 16,
        backgroundColor: 'var(--tg-theme-bg-color)',
        color: 'var(--tg-theme-text-color)',
        minHeight: '100vh',
      }}
    >
      <Title level="1">🛒 Корзина</Title>
    </div>
  )
}
