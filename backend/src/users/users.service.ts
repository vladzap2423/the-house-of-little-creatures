import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

export interface TelegramUserPayload {
  telegramId: string;
  firstName?: string | null;
  lastName?: string | null;
}

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async createOrUpdate(payload: TelegramUserPayload): Promise<User> {
    const { telegramId } = payload;

    const firstName =
      payload.firstName && payload.firstName.trim() !== ''
        ? payload.firstName
        : undefined;

    const lastName =
      payload.lastName && payload.lastName.trim() !== ''
        ? payload.lastName
        : undefined;

    let user = await this.usersRepo.findOne({ where: { telegramId } });

    if (!user) {
      user = this.usersRepo.create({
        telegramId,
        firstName,
        lastName,
      });

      await this.usersRepo.save(user);
      this.logger.log(`Created new user telegramId=${telegramId}`);

      return user;
    }

    let updated = false;

    if (user.firstName !== firstName) {
      user.firstName = firstName;
      updated = true;
    }

    if (user.lastName !== lastName) {
      user.lastName = lastName;
      updated = true;
    }

    if (updated) {
      await this.usersRepo.save(user);
      this.logger.log(`Updated user telegramId=${telegramId}`);
    }

    return user;
  }

  async findByTelegramId(telegramId: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { telegramId } });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }
}
