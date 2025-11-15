'use client'
import { Title, Text, Avatar } from '@telegram-apps/telegram-ui'

export default function ProfilePage() {

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        textAlign: 'center',
      }}
    >
      <Title level="1">Главная</Title>
    </main>
  )
}

