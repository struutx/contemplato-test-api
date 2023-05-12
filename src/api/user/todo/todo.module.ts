import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Todo } from './todo.entity';
import { JwtStrategy } from '../auth/auth.strategy';
import { LocalStrategy } from '../auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserModule } from '../user.module';
import { User } from '../user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User]), AuthModule, TodoModule],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
