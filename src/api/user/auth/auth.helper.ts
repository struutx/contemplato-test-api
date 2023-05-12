import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/api/user/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthHelper {
    @InjectRepository(User)
    private readonly repo: Repository<User>;
    private readonly jwt: JwtService;

    constructor(jwt: JwtService) {
        this.jwt = jwt;
    };

    public async decode(token: string): Promise<any> {
        return this.jwt.decode(token, null);
    };

    public async validateUser(decoded: any): Promise<User> {
        return this.repo.findOne(decoded.id);
    };

    public createToken(user: User): string {
        return this.jwt.sign({ id: user.id, email: user.email });
    };

    public validatePassword(password: string, userPwd: string): boolean {
        return bcrypt.compareSync(password, userPwd);
    };

    public encodePassword(password: string): string {
        const salt: string = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(password, salt);
    };

    private async validateToken(token: string): Promise<boolean | any> {
        const decodedToken = this.jwt.verify(token);
        const user: User = await this.validateUser(decodedToken);

        if (!decodedToken) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        };

        if (user) {
            return true;
        }

        throw new UnauthorizedException();   
    };
}