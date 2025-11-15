'use client'

import dynamic from 'next/dynamic'
import { PropsWithChildren } from 'react'

// Загружаем Root только на клиенте
const Root = dynamic(() => import('./Root').then(m => m.Root), {
    ssr: false,
})

export function AppRootClient({ children }: PropsWithChildren) {
    return <Root>{children}</Root>
}
