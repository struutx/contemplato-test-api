import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/auth.strategy';
import { AuthHelper } from './auth/auth.helper';
import { TodoModule } from './todo/todo.module';
import { ExternalModule } from './external/external.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, TodoModule, ExternalModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}