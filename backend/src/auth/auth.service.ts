import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  parseInitData(initData: string) {
    if (!initData) {
      return { error: 'initData is empty' };
    }

    const params = new URLSearchParams(initData);
    const result: Record<string, any> = {};

    for (const [key, value] of params.entries()) {
      // если значение JSON — попробуем распарсить
      try {
        result[key] = JSON.parse(value);
      } catch {
        result[key] = value;
      }
    }

    return result;
  }
}
