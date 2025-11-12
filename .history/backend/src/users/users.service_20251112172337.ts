import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async createOrUpdate(userData: {
    telegramId: string;
    firstName?: string;
    lastName?: string;
  }): Promise<User> {
    const { telegramId, firstName, lastName } = userData;

    let user = await this.usersRepo.findOne({ where: { telegramId } });

    if (!user) {
      // Новый пользователь
      user = this.usersRepo.create({
        telegramId,
        firstName,
        lastName,
      });
      return this.usersRepo.save(user);
    }

    // Проверяем, изменилось ли имя
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
    }

    return user;
  }

  /**
   * Получить пользователя по telegramId
   */
  async findByTelegramId(telegramId: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { telegramId } });
  }

  /**
   * Получить пользователя по внутреннему ID
   */
  async findById(id: number): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }
}
