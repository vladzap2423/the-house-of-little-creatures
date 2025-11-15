import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }

  async authWithTelegram(initData: string) {
    if (!initData) {
      throw new UnauthorizedException('Init data is empty');
    }

    const params = new URLSearchParams(initData);

    const signature = params.get('signature'); 

    if (!signature) {
      console.log('Using WebApp hash mode');
    }

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
