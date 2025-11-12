import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  async handleTelegramAuth(@Body('initData') initData: string) {
    // просто передаём строку в сервис, чтобы её распарсить
    const parsed = this.authService.parseInitData(initData);
    return parsed;
  }
}
