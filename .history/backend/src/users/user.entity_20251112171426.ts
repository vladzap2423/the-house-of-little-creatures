import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'bigint', unique: true })
    telegramId: string;

    @UpdateDateColumn()
    updatedAt: Date

}
