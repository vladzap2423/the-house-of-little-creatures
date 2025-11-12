'use client'

import { type PropsWithChildren } from 'react'
import {
  initData,
  miniApp,
  useLaunchParams,
  useSignal,
} from '@telegram-apps/sdk-react'
import { AppRoot } from '@telegram-apps/telegram-ui'

import { ErrorBoundary } from '../ErrorBoundary'
import { ErrorPage } from '../ErrorPage'
import { useDidMount } from '@/hooks/useDidMounts' // убедись, что файл называется useDidMounts.ts
import './'

function RootInner({ children }: PropsWithChildren) {
  const lp = useLaunchParams()
  const isDark = useSignal(miniApp.isDark)

  // просто покажем информацию о пользователе (для отладки)
  const initDataUser = useSignal(initData.user)
  console.log('Telegram user:', initDataUser)

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      {children}
    </AppRoot>
  )
}

export function Root(props: PropsWithChildren) {
  // Telegram Mini Apps не позволяют полноценно использовать SSR
  const didMount = useDidMount()

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <div className="root__loading">Loading...</div>
  )
}
