import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ExternalService } from './external.service'
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('External API')
@ApiBearerAuth()
@Controller('external')
export class ExternalController {
    @Inject(ExternalService)
    private readonly service: ExternalService;

    @Get('persons')
    @UseGuards(JwtAuthGuard)
    public listPersons() {
        return this.service.getPersons();
    }
}
