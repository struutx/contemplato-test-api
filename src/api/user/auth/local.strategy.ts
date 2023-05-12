import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        });
    };

    async validate(req: Request, email: string, password: string): Promise<User> {
        const user: User = await this.authService.validateCredentials(email, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}