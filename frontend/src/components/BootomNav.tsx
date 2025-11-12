'use client'

import { Tabbar } from '@telegram-apps/telegram-ui'
import { Home, ShoppingCart, User, Grid } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const iconColor = 'var(--tg-theme-text-color)'

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'var(--tg-theme-bg-color)',
        borderTop: '1px solid var(--tg-theme-hint-color)',
        textAlign: 'center'
      }}
    >
      <Tabbar>
        <Tabbar.Item
          selected={pathname === '/'}
          text="Домой"
          onClick={() => router.push('/')}
        >
          <Home color={iconColor} size={26} />
        </Tabbar.Item>

        <Tabbar.Item
          selected={pathname === '/catalog'}
          text="Каталог"
          onClick={() => router.push('/catalog')}
        >
          <Grid color={iconColor} size={26} />
        </Tabbar.Item>

        <Tabbar.Item
          selected={pathname === '/cart'}
          text="Корзина"
          onClick={() => router.push('/cart')}
        >
          <ShoppingCart color={iconColor} size={26} />
        </Tabbar.Item>

        <Tabbar.Item
          selected={pathname === '/profile'}
          text="Профиль"
          onClick={() => router.push('/profile')}
        >
          <User color={iconColor} size={26} />
        </Tabbar.Item>
      </Tabbar>
    </div>
  )
}
