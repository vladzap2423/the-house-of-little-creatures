'use client';

import { useEffect } from 'react';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { userService } from '@/service/user.service';

export function AuthGate() {
    const lp = useLaunchParams();
    const data = lp.tgWebAppData;
    const user = data?.user;

    // Собираем RAW вручную
    const rawInitData = data
        ? Object.entries(data)
            .map(([key, value]) => {
                const v = typeof value === 'object' ? JSON.stringify(value) : value;
                return `${key}=${v}`;
            })
            .join('&')
        : undefined;

    console.log("RAW:", rawInitData);

    useEffect(() => {
        if (!rawInitData || !user) return;

        userService
            .authWithTelegram({ initData: rawInitData })
            .then((dbUser) => console.log('Пользователь сохранён:', dbUser))
            .catch((err) => console.error('Ошибка авторизации:', err));
    }, [rawInitData, user]);

    return null;
}
