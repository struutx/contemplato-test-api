import { HttpException, HttpStatus, Inject, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/api/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    @InjectRepository(User)
    private readonly repo: Repository<User>;

    public async getByEmail(email: string): Promise<User> {
        return await this.repo.findOne({ where: { email: email } });
    };

    public async listUsers(): Promise<User[]> {
        return await this.repo.find();
    }
};
