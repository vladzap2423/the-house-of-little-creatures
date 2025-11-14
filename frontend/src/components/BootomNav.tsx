'use client'

import { Tabbar } from '@telegram-apps/telegram-ui'
import { Home, ShoppingCart, User, Grid } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  const iconColor = 'var(--tg-theme-text-color)'
  const activeColor = 'var(--tg-theme-button-color)'

  return (
    <div
      className="
        fixed bottom-30 left-0 right-0 z-[100]
        flex justify-around items-center
        border-t
        rounded-t-3xl
        shadow-[0_-2px_20px_rgba(0,0,0,0.08)]
        backdrop-blur-md
        pb-[env(safe-area-inset-bottom)] pt-1
        text-center
      "
      style={{
        backgroundColor: 'var(--tg-theme-secondary-bg-color)',
        borderColor: 'var(--tg-theme-hint-color)',
      }}
    >
      <Tabbar className="w-full flex justify-around">
        <Tabbar.Item
          selected={pathname === '/'}
          text="Домой"
          onClick={() => router.push('/')}
        >
          <Home
            size={26}
            color={pathname === '/' ? activeColor : iconColor}
          />
        </Tabbar.Item>

        <Tabbar.Item
          selected={pathname === '/catalog'}
          text="Каталог"
          onClick={() => router.push('/catalog')}
        >
          <Grid
            size={26}
            color={pathname === '/catalog' ? activeColor : iconColor}
          />
        </Tabbar.Item>

        <Tabbar.Item
          selected={pathname === '/cart'}
          text="Корзина"
          onClick={() => router.push('/cart')}
        >
          <ShoppingCart
            size={26}
            color={pathname === '/cart' ? activeColor : iconColor}
          />
        </Tabbar.Item>

        <Tabbar.Item
          selected={pathname === '/profile'}
          text="Профиль"
          onClick={() => router.push('/profile')}
        >
          <User
            size={26}
            color={pathname === '/profile' ? activeColor : iconColor}
          />
        </Tabbar.Item>

        <Tabbar.Item
          selected={pathname === '/debug'}
          text="Логи"
          onClick={() => router.push('/debug')}
        >
          <User
            size={26}
            color={pathname === '/debug' ? activeColor : iconColor}
          />
        </Tabbar.Item>
      </Tabbar>
    </div>
  )
}
