import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }

  validateTelegramInitData(initData: string) {
    if (!initData) throw new UnauthorizedException('Init data is empty');

    const params = new URLSearchParams(initData);
    const hash = params.get('hash');

    if (!hash) throw new UnauthorizedException('Missing hash');
    params.delete('hash');

    console.log('BOT_TOKEN:', process.env.BOT_TOKEN);


    const dataCheckString = Array.from(params.keys())
      .sort()
      .map((key) => `${key}=${params.get(key)}`)
      .join('\n');

    // ✔ Правильное вычисление Telegram secret key
    const secretKey = crypto
      .createHash('sha256')
      .update(process.env.BOT_TOKEN!)
      .digest();

    const checkHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (checkHash !== hash) {
      console.log('Expected:', checkHash);
      console.log('Received:', hash);
      throw new UnauthorizedException('Wrong signature');
    }

    // ✔ Аккуратное извлечение user
    let user: any = {};
    const userRaw = params.get('user');
    if (userRaw) {
      try {
        user = JSON.parse(userRaw);
      } catch {
        throw new UnauthorizedException('Invalid user JSON');
      }
    }

    return {
      user,
      auth_date: params.get('auth_date'),
      query_id: params.get('query_id'),
    };
  }

  async authWithTelegram(initData: string) {
    const data = this.validateTelegramInitData(initData);

    const user = await this.usersService.createOrUpdate({
      telegramId: String(data.user.id),
      firstName: data.user.first_name,
      lastName: data.user.last_name,
    });

    return {
      ok: true,
      user,
    };
  }
}
