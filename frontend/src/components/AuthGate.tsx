'use client';

import { useEffect, useRef } from 'react';
import { useRawInitData } from '@telegram-apps/sdk-react';
import { userService } from '@/service/user.service';

export function AuthGate() {
    const initDataRaw = useRawInitData();

    // чтобы гарантировать вызов только один раз
    const didSendRef = useRef(false);

    useEffect(() => {
        if (!initDataRaw) return;
        if (didSendRef.current) return; // уже отправляли
        didSendRef.current = true;

        console.log("AuthGate → sending initData in background...");

        const controller = new AbortController();

        const timeout = setTimeout(() => {
            console.log("AuthGate → abort: backend did not respond in time");
            controller.abort();
        }, 3000); // 3 сек лимит

        async function send() {
            try {
                await userService.authWithTelegram(
                    { initData: initDataRaw! },
                    controller.signal
                );
                console.log("AuthGate → backend OK");
            } catch (e: any) {
                if (e.name === "AbortError") {
                    console.log("AuthGate → aborted (backend slow)");
                } else {
                    console.log("AuthGate → request failed silently:", e?.message);
                }
            } finally {
                clearTimeout(timeout);
            }
        }

        // отправляем без await — UI не блокируется
        send();

        return () => clearTimeout(timeout);
    }, [initDataRaw]);

    return null;
}
