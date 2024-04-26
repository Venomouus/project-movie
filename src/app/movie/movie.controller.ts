/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, ParseUUIDPipe, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMovieSwagger } from './swagger/create-movie.swagger';
import { BadRequestSwagger } from './helpers/bad-request.swagger';
import { IndexMovieSwagger } from './swagger/index-movie.swagger';
import { ShowMovieSwagger } from './swagger/show-movie.swagger';
import { NotFoundSwagger } from './helpers/not-found.swagger';
import { UpdateMovieSwagger } from './swagger/update-movie.swagger';

@Controller('api/movie')
@ApiTags('Movies')
export class MovieController {
    constructor (private readonly movieService: MovieService) {}

    @Post()
    @ApiOperation({ summary: 'Adicionar um novo filme' })
    @ApiResponse({
        status: 201,
        description: 'Novo filme criado com sucesso',
        type: CreateMovieSwagger,
      })
      @ApiResponse({
        status: 400,
        description: 'Parâmetros inválidos',
        type: BadRequestSwagger,
      })
    async create(@Body() body){
        return await this.movieService.create(body)
    }


    @Get()
    @ApiOperation({ summary: 'Listar todos os filmes' })
    @ApiResponse({
      status: 200,
      description: 'Lista de filmes retornada com sucesso',
      type: IndexMovieSwagger,
    })
    async index() {
      return await this.movieService.findAll();
    }


    @Get(':id')
    @ApiOperation({ summary: 'Exibir os dados de um filme' })
    @ApiResponse({
        status: 200,
        description: 'Dados de um filme retornado com sucesso',
        type: ShowMovieSwagger,
    })
    @ApiResponse({
        status: 404,
        description: 'Task não foi encontrada',
        type: NotFoundSwagger,
    })
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.movieService.findOneOrFail(id)
    }



    @Put(':id')
    @ApiOperation({ summary: 'Atualizar os dados de um filme' })
    @ApiResponse({
      status: 200,
      description: 'Filme atualizado com sucesso',
      type: UpdateMovieSwagger,
    })
    @ApiResponse({
      status: 400,
      description: 'Dados inválidos',
      type: BadRequestSwagger,
    })
    async update(@Param('id', new ParseUUIDPipe()) id:string, @Body() body) {
        return await this.movieService.update(id,body)
    }



    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remover um filme' })
    @ApiResponse({ status: 204, description: 'Filme removido com sucesso' })
    @ApiResponse({
        status: 404,
        description: 'Task não foi encontrada',
        type: NotFoundSwagger,
    })
    async destroy(@Param('id', new ParseUUIDPipe()) id:string ){
        await this.movieService.deleteById(id)
    }
}
