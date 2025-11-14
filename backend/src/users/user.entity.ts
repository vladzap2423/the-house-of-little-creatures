import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    // Telegram ID нельзя хранить как number — слишком большой
    @Column({
        type: 'bigint',
        unique: true,
        comment: 'Telegram user ID (stored as string because bigint > JS limit)',
    })
    telegramId: string;

    @Column({ nullable: true })
    firstName?: string;

    @Column({ nullable: true })
    lastName?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
