import { http } from "@/lib/api/http";

export interface TelegramUserPayload {
    initData: string;
}


export const userService = {
    authWithTelegram: (data: TelegramUserPayload, signal?: AbortSignal) =>
        http.post('/auth/telegram', data, { signal }),

}
