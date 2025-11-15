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

  async createOrUpdate(data: {
    telegramId: string;
    firstName: string | null;
    lastName: string | null;
  }): Promise<User> {
    const result = await this.usersRepo
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        telegramId: data.telegramId,
        firstName: data.firstName ?? null,
        lastName: data.lastName ?? null,
      })
      .onConflict(`
        ("telegramId") DO UPDATE 
        SET 
          "firstName" = EXCLUDED."firstName",
          "lastName" = EXCLUDED."lastName"
      `)
      .returning('*')
      .execute();

    const user = result.raw[0];

    this.logger.log(
      `Upsert user telegramId=${data.telegramId} (id=${user.id})`
    );

    return user;
  }

  async findByTelegramId(telegramId: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { telegramId } });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }
}
