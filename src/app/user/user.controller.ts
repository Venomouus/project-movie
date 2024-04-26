/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards,
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserSwagger } from './swagger/create-movie.swagger';
import { BadRequestSwagger } from '../movie/helpers/bad-request.swagger';
import { IndexUserSwagger } from './swagger/index-movie.swagger';
import { NotFoundSwagger } from '../movie/helpers/not-found.swagger';
import { ShowUserSwagger } from './swagger/show-movie.swagger';
import { UpdateUserSwagger } from './swagger/update-movie.swagger';

@Controller('api/user')
@ApiTags('User')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Post()
    @ApiOperation({ summary: 'Adicionar um novo usuário' })
    @ApiResponse({
      status: 201,
      description: 'Novo usuário criado com sucesso',
      type: CreateUserSwagger,
    })
    @ApiResponse({
      status: 400,
      description: 'Parâmetros inválidos',
      type: BadRequestSwagger,
    })
    async store(@Body() body: CreateUserDto){
        return await this.userService.store(body)
    }


    @Get()
    @ApiOperation({ summary: 'Listar todos os usuários' })
    @ApiResponse({
      status: 200,
      description: 'Lista de usuários retornada com sucesso',
      type: IndexUserSwagger,
      isArray: true,
    })
    async index() {
        return await this.userService.findAll()
    }
    

    @Get(':id')
    @ApiOperation({ summary: 'Exibir os dados de um usuário' })
    @ApiResponse({
        status: 200,
        description: 'Dados de um usuário retornado com sucesso',
        type: ShowUserSwagger,
    })
    @ApiResponse({
        status: 404,
        description: 'Task não foi encontrada',
        type: NotFoundSwagger,
     })
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.userService.findOneOrFail(id)
    }
    

    @Put(":id")
    @ApiOperation({ summary: 'Atualizar os dados de um usuário' })
    @ApiResponse({
      status: 200,
      description: 'usuário atualizado com sucesso',
      type: UpdateUserSwagger,
    })
    @ApiResponse({
      status: 400,
      description: 'Dados inválidos',
      type: BadRequestSwagger,
    })
    @ApiResponse({
      status: 404,
      description: 'Task não foi encontrada',
      type: NotFoundSwagger,
    })
    async update(
        @Param('id', new ParseUUIDPipe()) id:string, 
        @Body() body: UpdateUserDto) {
        return await this.userService.update(id, body)
    }
    

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remover um usuário' })
    @ApiResponse({ status: 204, description: 'usuário removido com sucesso' })
    @ApiResponse({
      status: 404,
      description: 'Task não foi encontrada',
      type: NotFoundSwagger,
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id:string ){
        await this.userService.destroy(id)
    }
}
