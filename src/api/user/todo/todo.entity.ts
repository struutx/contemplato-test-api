import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { User } from "../user.entity";

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar' })
    public title!: string;

    @Column({ type: 'varchar' })
    public description!: string;

    @Column({ type: 'boolean' })
    public completed!: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;

    @ManyToOne(type => User, user => user.todos)
    public user: User;

}