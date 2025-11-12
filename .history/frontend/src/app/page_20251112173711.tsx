'use client'

import { useEffect } from 'react'
import { initData, initDataRaw } from '@telegram-apps/sdk-react'
import { Title, Text, Button, Card, Image } from '@telegram-apps/telegram-ui'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const data = initData
    const raw = initDataRaw

    if (data?.user) {
      console.log('Пользователь Telegram:', data.user)
    }
    if (raw) {
      console.log('initDataRaw для отправки на backend:', raw)

      // Здесь можешь сразу отправить на NestJS backend:
      // fetch('http://localhost:3000/auth/telegram', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ initData: raw }),
      // })
      //   .then((res) => res.json())
      //   .then((result) => console.log('Ответ от backend:', result))
      //   .catch(console.error)
    }
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: 16,
        backgroundColor: 'var(--tg-theme-bg-color)',
        color: 'var(--tg-theme-text-color)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Image
        src="/1600.jpg"
        alt="The House of Little Creatures"
        width={200}
        height={200}
        style={{ borderRadius: 16, marginTop: 24, objectFit: 'cover' }}
      />

      <Title level="1" style={{ marginTop: 16 }}>
        The House of Little Creatures
      </Title>

      <Text style={{ marginTop: 8, maxWidth: 320, opacity: 0.9 }}>
        Добро пожаловать в уютный мир вязаных игрушек 💕
      </Text>

      <Button
        mode="bezeled"
        size="l"
        style={{
          marginTop: 'auto',
          marginBottom: 100,
          width: 200,
          fontWeight: 600,
        }}
        onClick={() => router.push('/catalog')}
      >
        Перейти в каталог
      </Button>
    </div>
  )
}
