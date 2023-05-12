import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/api/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
    @InjectRepository(User)
    private readonly repo: Repository<User>;

    @Inject(AuthHelper)
    private readonly helper: AuthHelper;

    public async registerUser(body: RegisterDto): Promise<User> {
        const { email, password } = body;
        let user: User = await this.repo.findOne({ where: { email: email } });

        if (user) {
            throw new HttpException('User already Registered!', HttpStatus.BAD_REQUEST);
        };

        user = new User();
        user.email = email;
        user.password = this.helper.encodePassword(password);

        return this.repo.save(user);
    };

    public async login(body: LoginDto): Promise<string> {
        const { email, password } = body;
        const user = await this.repo.findOne({ where: { email: email } });
        const isValidPwd = this.helper.validatePassword(password, user.password);

        if (user) {
            if (isValidPwd) {
                return this.helper.createToken(user);
            };

            throw new HttpException('Invalid Password', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
    };

    public async refreshToken(user: User): Promise<string> {
        return this.helper.createToken(user);
    };

    public async validateCredentials(email: string, password: string): Promise<User | null > {
        const user = await this.repo.findOne({ where: { email: email, password: password } });

        return user ?? null;
    };
}
