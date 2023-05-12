import { Body, Controller, Get, Inject, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ExternalService } from './external.service'
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

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
    };

    @Get('movies')
    @UseGuards(JwtAuthGuard)
    public getFilms() {
        return this.service.getMovies();
    };

    @ApiQuery({ name: 'movieId', required: true, type: Number })
    @Get('movies/:id')
    @UseGuards(JwtAuthGuard)
    public getFilmsById(@Query() movieId: number) {
        return this.service.getMoviesById(movieId);
    };

}
