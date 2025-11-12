'use client'

import { Title, Text, Card, Button, Image } from '@telegram-apps/telegram-ui'
import { Edit3, MapPin, Package } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()

  const user = {
    name: 'Владимир Иванов',
    username: '@vlad_knits',
    avatar: '/1600.jpg',
    email: 'vlad@example.com',
    address: 'г. Москва, ул. Уютная, д. 5',
    ordersCount: 7,
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--tg-theme-bg-color)',
        color: 'var(--tg-theme-text-color)',
        padding: 16,
      }}
    >
      <Title level="1">👤 Профиль</Title>

      {/* Блок пользователя */}
      <Card
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: 16,
          marginTop: 16,
          background: 'var(--tg-theme-secondary-bg-color)',
        }}
      >
        <Image
          src={user.avatar}
          alt={user.name}
          width={80}
          height={80}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
        <div style={{ flex: 1 }}>
          <Text weight="2" style={{ fontSize: 18 }}>
            {user.name}
          </Text>
          <Text style={{ opacity: 0.7 }}>{user.username}</Text>
          <Button
            size="s"
            mode="outline"
            style={{ marginTop: 8 }}
            onClick={() => alert('Редактирование профиля')}
          >
            <Edit3 size={16} style={{ marginRight: 6 }} />
            Редактировать
          </Button>
        </div>
      </Card>

      {/* Карточка с информацией */}
      <Card
        style={{
          padding: 16,
          marginTop: 16,
          background: 'var(--tg-theme-secondary-bg-color)',
        }}
      >
        <Text weight="2">Информация</Text>
        <div style={{ marginTop: 8 }}>
          <Text>Email: {user.email}</Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
            <MapPin size={16} />
            <Text>Адрес: {user.address}</Text>
          </div>
        </div>
      </Card>

      {/* Статистика заказов */}
      <Card
        style={{
          padding: 16,
          marginTop: 16,
          background: 'var(--tg-theme-secondary-bg-color)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Package size={18} />
          <Text>Заказов оформлено: {user.ordersCount}</Text>
        </div>
        <Button
          size="m"
          style={{ marginTop: 12 }}
          onClick={() => router.push('/catalog')}
        >
          Смотреть каталог
        </Button>
      </Card>
    </div>
  )
}
