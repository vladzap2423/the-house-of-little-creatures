'use client';

import { useEffect } from 'react';
import { useRawInitData } from '@telegram-apps/sdk-react';
import { userService } from '@/service/user.service';

export function AuthGate() {
    const initDataRaw = useRawInitData();

    useEffect(() => {
        if (!initDataRaw) return;

        const id = requestAnimationFrame(() => {
            setTimeout(() => {
                userService.authWithTelegram({ initData: initDataRaw })
                    .catch(console.error);
            }, 0);
        });

        return () => cancelAnimationFrame(id);
    }, [initDataRaw]);

    return null;
}
