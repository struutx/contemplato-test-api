import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '@/api/user/todo/todo.entity';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class TodoService {
    @InjectRepository(Todo)
    private readonly repo: Repository<Todo>;

    public async createTodo(todo: any, user: User) {
       const { title, description, completed } = todo;

       if (!title) {
        throw new HttpException('Bad Request!', HttpStatus.BAD_REQUEST);
       };

       const task = this.repo.create({ title: title, description: description, completed: completed, user: user})

       return task.save();
    };

    public async getAll() {
        return await this.repo.find();
    }
}
