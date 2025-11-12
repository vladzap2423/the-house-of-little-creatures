'use client'

import { useEffect } from 'react'
import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  useSignal,
} from '@telegram-apps/sdk-react'
import { Title, Text, Button } from '@telegram-apps/telegram-ui'

export default function InitDataPage() {
  const initDataRaw = useSignal(_initDataRaw)
  const initDataState = useSignal(_initDataState)

  useEffect(() => {
    console.log('initDataRaw:', initDataRaw)
    console.log('initDataState:', initDataState)

    // пример отправки на backend:
    if (initDataRaw) {
      fetch('http://localhost:5000/auth/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initData: initDataRaw }),
      })
        .then((res) => res.json())
        .then((res) => console.log('Ответ от backend:', res))
        .catch(console.error)
    }
  }, [initDataRaw, initDataState])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <Title level="1">Проверка Telegram Init Data</Title>

      {initDataState?.user ? (
        <>
          <Text className="mt-4">
            Привет, {initDataState.user.first_name}!
          </Text>
          <Text>ID: {initDataState.user.id}</Text>
        </>
      ) : (
        <Text className="mt-4">
          Init Data отсутствует (открой Mini App через Telegram)
        </Text>
      )}

      <Button className="mt-6">Обновить</Button>
    </main>
  )
}
