import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '@/api/user/todo/todo.entity';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class TodoService {
    @InjectRepository(Todo)
    private readonly repo: Repository<Todo>;
    @InjectRepository(User)
    private readonly userRepo: Repository<User>;

    public async createTodo(todo: any, user) {
       const { title, description, completed } = todo;
       const todoUser = await this.userRepo.findOne({ where: { id: user.userId } })

       if (!todoUser) {
        throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND)
       };

       if (!title) {
        throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST);
       };

       const task = this.repo.create({ title: title, description: description, completed: completed, user: user.userId})

       return task.save();
    };

    public async getAll() {
        return await this.repo.find();
    }
}
