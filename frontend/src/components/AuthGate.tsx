'use client'

import { useEffect, useRef } from 'react'
import { userService } from '@/service/user.service'

export function AuthGate() {
    const didSendRef = useRef(false)

    useEffect(() => {
        const tg = typeof window !== 'undefined'
            ? (window as any).Telegram?.WebApp
            : null

        if (!tg) {
            console.warn("AuthGate: Telegram WebApp API not found — running outside MiniApp")
            return
        }

        const raw = tg.initDataRaw

        if (!raw || raw.length < 10) {
            console.warn("AuthGate: initDataRaw is empty or invalid", raw)
            return
        }

        if (didSendRef.current) return
        didSendRef.current = true

        console.log("AuthGate → sending REAL initDataRaw:", raw)

        const controller = new AbortController()

        userService
            .authWithTelegram({ initData: raw }, controller.signal)
            .then(() => console.log("AuthGate → backend OK"))
            .catch(err => console.warn("AuthGate → failed:", err?.message))

    }, [])

    return null
}
