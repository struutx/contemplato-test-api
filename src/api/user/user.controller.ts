
import { Controller, Get, Inject, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./auth/auth.guard";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    @Inject(UserService)
    private readonly service: UserService;

    @Get('list')
    @UseGuards(JwtAuthGuard)
    private listUsers() {
        return this.service.listUsers();
    }
}