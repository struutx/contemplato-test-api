import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Todos')
@ApiBearerAuth()
@Controller('todo')
export class TodoController {
    @Inject(TodoService)
    private readonly service: TodoService;

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    public createTodo(@Body() todo: string, @Req() req) {
        return this.service.createTodo(todo, req.user);
    };

    
    @Get('/findUser')
    @UseGuards(AuthGuard('jwt'))
    public findUser(@Req() req) {
        console.log(req.user);
    }

    @Get('/all')
    @UseGuards(JwtAuthGuard)
    public getAllTodos() {
        return this.service.getAll();
    }
};
