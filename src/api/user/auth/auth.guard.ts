import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from 'express';
import { AuthGuard, IAuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);

        const { user }: Request = context.switchToHttp().getRequest();

        return user ? true : false;
    };

    public asynchandleRequest(err, user, info) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        };

        return user;
    }
}