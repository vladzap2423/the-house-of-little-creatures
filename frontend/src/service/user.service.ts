import { http } from "@/lib/api/http";

export interface TelegramUserPayload {
    initData: string;
}

export interface UserDto {
    id: number;
    telegramId: number;
    firstName?: string;
    lastName?: string;
    createdAt: string;
    updatedAt: string;
}

export const userService = {
    authWithTelegram: (data: TelegramUserPayload) =>
        http.post<UserDto>('/auth/telegram', data),

    getMe: () => http.get<UserDto>('/users/me'),

    updateName: (firstName: string, lastName: string) =>
        http.put<UserDto>('/users/update', { firstName, lastName }),
};
