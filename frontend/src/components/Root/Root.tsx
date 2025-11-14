'use client'

import { type PropsWithChildren, useEffect } from 'react'
import { miniApp, useLaunchParams, useSignal } from '@telegram-apps/sdk-react'
import { AppRoot } from '@telegram-apps/telegram-ui'

import { ErrorBoundary } from '../ErrorBoundary'
import { ErrorPage } from '../ErrorPage'
import { useDidMount } from '@/hooks/useDidMounts'
import './styles.css'
import { AuthGate } from '../AuthGate'

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
