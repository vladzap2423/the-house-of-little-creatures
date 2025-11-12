'use client'

import { useEffect } from 'react'
import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  useSignal,
} from '@telegram-apps/sdk-react'

import { Title, Text, Button, Image } from '@telegram-apps/telegram-ui'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const initDataRaw = useSignal(_initDataRaw)
  const initDataState = useSignal(_initDataState)

  useEffect(() => {
    console.log('initDataRaw:', initDataRaw)
    console.log('initDataRaw:', raw)
  }, [data, raw])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <Title level="1">Telegram Mini App</Title>
      <Text className="mt-2">
        Проверь консоль — здесь появится initData, если приложение запущено в Telegram
      </Text>
      <Button className="mt-6">Обновить</Button>
    </main>
  )
}
