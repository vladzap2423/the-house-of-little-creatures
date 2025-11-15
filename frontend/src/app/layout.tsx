import type { PropsWithChildren } from 'react'

import '@telegram-apps/telegram-ui/dist/styles.css'
import 'normalize.css/normalize.css'
import './_assets/global.css'

import { BottomNav } from '@/components/BootomNav'
import { AppRootClient } from '@/components/AppRootClient'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <AppRootClient>
          {children}
          <BottomNav />
        </AppRootClient>
      </body>
    </html>
  )
}
