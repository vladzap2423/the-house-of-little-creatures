'use client'
import './BottomNav.css'

import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { House, Grid2x2, ShoppingBasket, CircleUserRound } from 'lucide-react'




const NAV_ITEMS = [
  {
    path: '/',
    label: 'Главная',
    icon: <House color="#00fadd" />,
  },
  {
    path: '/catalog',
    label: 'Каталог',
    icon: <Grid2x2 color="#00fadd" />,
  },
  {
    path: '/cart',
    label: 'Корзина',
    icon: <ShoppingBasket color="#00fadd" />,
  },
  {
    path: '/profile',
    label: 'Профиль',
    icon: <CircleUserRound color="#00fadd" />,
  },

]

export function BottomNav() {
  const pathname = usePathname() ?? '/'
  const router = useRouter()

  return (
    <nav
      className="thlc-floating-tabbar"
      role="navigation"
      aria-label="Основная навигация"
    >
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.path ||
          (item.path !== '/' && pathname.startsWith(item.path + '/'))

        return (
          <button
            key={item.path}
            type="button"
            className="thlc-bottom-nav__item"
            aria-current={isActive ? 'page' : undefined}
            onClick={() => {
              if (!isActive) router.replace(item.path)
            }}
          >
            <motion.div
              animate={{ scale: isActive ? 1.17 : 1 }}
              transition={{ duration: 0.15 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* ИКОНКА */}
              {item.icon}
            </motion.div>

            {/* ПОДПИСЬ */}
            <span
              style={{
                color: isActive
                  ? 'var(--tg-theme-button-color)'
                  : 'var(--tg-theme-hint-color)',
              }}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
