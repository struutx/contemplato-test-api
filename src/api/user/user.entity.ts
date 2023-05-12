import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Todo } from './todo/todo.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar' })
    public email!: string;

    @Exclude()
    @Column({ type: 'varchar' })
    public password!: string;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;

    @OneToMany(() => Todo, todo => todo.user)
    public todos!: Todo[];

}