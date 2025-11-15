'use client'

import { type PropsWithChildren, useEffect } from 'react'
import { miniApp, useLaunchParams, useSignal } from '@telegram-apps/sdk-react'
import { AppRoot } from '@telegram-apps/telegram-ui'

import { ErrorBoundary } from '../ErrorBoundary'
import { ErrorPage } from '../ErrorPage'
import './styles.css'
import dynamic from 'next/dynamic'


const AuthGate = dynamic(() => import('../AuthGate').then(m => m.AuthGate), {
  ssr: false,
})

function RootInner({ children }: PropsWithChildren) {
  const lp = useLaunchParams()
  const isDark = useSignal(miniApp.isDark)

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    > 
      <AuthGate />
      {children}
    </AppRoot>
  )
}

export function Root({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner>{children}</RootInner>
    </ErrorBoundary>
  )
}
