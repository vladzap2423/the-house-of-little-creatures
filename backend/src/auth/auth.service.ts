import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { validateTelegramSignature } from './telegramValidate';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }

  async authWithTelegram(initData: string) {
    if (!initData) {
      throw new UnauthorizedException('Init data is empty');
    }
    // 1. Валидация подписи
    const botToken = process.env.BOT_TOKEN;
    if (!botToken) {
      throw new Error('BOT_TOKEN is not set in environment variables');
    }
    try {
      validateTelegramSignature(initData, botToken);
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Invalid Telegram signature');
    }

    const params = new URLSearchParams(initData);

    const rawUser = params.get('user');

    if (!rawUser) {
      throw new UnauthorizedException('User not found');
    }

    let tgUser: any;
    try {
      tgUser = JSON.parse(rawUser);
    } catch {
      throw new UnauthorizedException('Invalid user JSON');
    }

    const user = await this.usersService.createOrUpdate({
      telegramId: String(tgUser.id),
      firstName: tgUser.first_name ?? null,
      lastName: tgUser.last_name ?? null,
    });
    return user;
  }
}
