'use client'

import { type PropsWithChildren, useEffect } from 'react'
import { miniApp, useLaunchParams, useSignal } from '@telegram-apps/sdk-react'
import { AppRoot } from '@telegram-apps/telegram-ui'

import { ErrorBoundary } from '../ErrorBoundary'
import { ErrorPage } from '../ErrorPage'
import { useDidMount } from '@/hooks/useDidMounts'
import './styles.css'

function RootInner({ children }: PropsWithChildren) {
  const lp = useLaunchParams()
  const isDark = useSignal(miniApp.isDark)

  useEffect(() => {
    try {
      console.log('✅ Telegram SDK initialized successfully')
    } catch (err) {
      console.warn('⚠️ SDK initialization failed (not in Telegram?):', err)
    }
  }, [])

  console.log('🌐 Launch params:', lp)
  console.log('🎨 Theme:', isDark ? 'dark' : 'light')

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      {children}
    </AppRoot>
  )
}

export function Root({ children }: PropsWithChildren) {
  const didMount = useDidMount()

  if (!didMount) {
    return <div className="root__loading">Loading...</div>
  }

  return (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner>{children}</RootInner>
    </ErrorBoundary>
  )
}
