/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, ParseUUIDPipe, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('api/movie')
export class MovieController {
    constructor (private readonly movieService: MovieService) {}

    @Get()
    async index() {
        return await this.movieService.findAll()
    }

    @Post()
    async create(@Body() body){
        return await this.movieService.create(body)
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.movieService.findOneOrFail(id)
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id:string, @Body() body) {
        return await this.movieService.update(id,body)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id:string ){
        await this.movieService.deleteById(id)
    }
}
