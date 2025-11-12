import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'bigint', unique: true })
    telegramId: string;

    @CreateDateColumn()
  createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}
