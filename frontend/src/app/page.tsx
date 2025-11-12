'use client'

import { Title, Text, Button, Card, Image } from '@telegram-apps/telegram-ui'
import { useRouter } from 'next/navigation'

export default function InitDataPage() {
  const router = useRouter()

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        textAlign: 'center',
        backgroundColor: 'var(--tg-theme-bg-color)',
        color: 'var(--tg-theme-text-color)',
      }}
    >
      {/* Картинка / логотип */}
      <Image
        src="/preview.png"
        alt="The House of Little Creatures"
        width={240}
        height={240}
        style={{
          borderRadius: 20,
          objectFit: 'cover',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        }}
      />

      {/* Название бренда */}
      <Title level="1" style={{ marginTop: 24, fontWeight: 700 }}>
        The House of Little Creatures
      </Title>

      {/* Подзаголовок */}
      <Text style={{ marginTop: 8, maxWidth: 340, opacity: 0.9 }}>
        Добро пожаловать в уютный мир <b>вязаных игрушек</b>, созданных с любовью 💕
        Каждое создание — уникально и несёт тепло рук мастера.
      </Text>

      {/* Карточка о магазине */}
      <Card
        style={{
          marginTop: 24,
          maxWidth: 360,
          padding: 16,
          borderRadius: 16,
          backgroundColor: 'var(--tg-theme-secondary-bg-color)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        }}
      >
        <Text weight="2">Почему выбирают нас:</Text>
        <ul
          style={{
            textAlign: 'left',
            paddingLeft: 20,
            lineHeight: 1.6,
            marginTop: 8,
          }}
        >
          <li>🧵 Ручная работа и внимание к деталям</li>
          <li>🌿 Натуральная, гипоаллергенная пряжа</li>
          <li>🎁 Упаковка в подарочную коробку</li>
          <li>🚚 Быстрая доставка по всей России</li>
        </ul>
      </Card>

      {/* Кнопка перехода в каталог */}
      <Button
        mode="bezeled"
        size="l"
        style={{
          marginTop: 32,
          width: 220,
          fontWeight: 600,
          borderRadius: 14,
        }}
        onClick={() => router.push('/catalog')}
      >
        Перейти в каталог
      </Button>

      {/* Дополнительный отступ снизу для Telegram UI */}
      <div style={{ height: 80 }} />
    </main>
  )
}
