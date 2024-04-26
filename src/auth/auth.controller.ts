/* eslint-disable prettier/prettier */
  import { Body, Controller,  Inject, Post, UseGuards } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { AuthService } from './auth.service';
  import { LoginDto } from './dto/create-login.dto';


  @Controller('api/auth')
  export class AuthController {
    constructor(@Inject(AuthService)private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<{ token: string}> {
      return await this.authService.login(loginDto)
    }
    
  }