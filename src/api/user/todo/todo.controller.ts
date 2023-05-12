import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Todos')
@ApiBearerAuth()
@Controller('todo')
export class TodoController {
    @Inject(TodoService)
    private readonly service: TodoService;

    @Post('create')
    @UseGuards(JwtAuthGuard)
    public createTodo(@Body() todo: string, @Req() req) {
        return this.service.createTodo(todo, req.user.id);
    };

    @Get('/all')
    @UseGuards(JwtAuthGuard)
    public getAllTodos() {
        return this.service.getAll();
    }
};
