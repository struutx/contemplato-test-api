import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { User } from '@/api/user/user.entity';
import { RegisterDto, LoginDto } from './auth.dto';
import { LocalAuthGuard } from './localAuth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly service: AuthService;

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    private register(@Body() body: RegisterDto): Promise<User> {
        return this.service.registerUser(body);
    };

    @Post('login')
    private login(@Body() body: LoginDto): Promise<string> {
        return this.service.login(body);
    };

    @Post('refresh')
    @UseGuards(LocalAuthGuard)
    private refresh(@Req() { user }: Request): Promise<string | never> {
        return this.service.refreshToken(<User>user);
    }
}
