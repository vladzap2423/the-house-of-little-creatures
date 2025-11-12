
import { useLaunchParams } from '@telegram-apps/sdk-react'
import { Title, Text, Avatar } from '@telegram-apps/telegram-ui'

export default function ProfilePage() {
  const lp = useLaunchParams()
  const user = lp.tgWebAppData?.user

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

      {user ? (
        <>
          <Avatar
            src={user.photo_url}
            alt={user.first_name}
            size={96}
            style={{ marginTop: 16 }}
          />
          <Text style={{ marginTop: 12, fontSize: 18, fontWeight: 600 }}>
            {user.first_name} {user.last_name}
          </Text>
          <Text style={{ opacity: 0.8 }}>ID: {user.id}</Text>
          {user.username && (
            <Text style={{ opacity: 0.8 }}>@{user.username}</Text>
          )}
        </>
      ) : (
        <Text style={{ marginTop: 16, opacity: 0.7 }}>
          Данные Telegram не найдены (Mini App открыт вне Telegram)
        </Text>
      )}
    </main>
  )
}

