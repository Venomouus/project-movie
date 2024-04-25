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

@Controller('api/user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get()
    async index() {
        return await this.userService.findAll()
    }
    
    @Post()
    async store(@Body() body: CreateUserDto){
        return await this.userService.store(body)
    }
    
    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.userService.findOneOrFail(id)
    }
    
    @Put(":id")
    async update(
        @Param('id', new ParseUUIDPipe()) id:string, 
        @Body() body: UpdateUserDto) {
        return await this.userService.update(id, body)
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id:string ){
        await this.userService.destroy(id)
    }
}
