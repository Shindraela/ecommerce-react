import * as bcrypt from 'bcrypt';
import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Res,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../strategies/jwt/jwt-auth.guard';
import { LocalAuthGuard } from '../strategies/local/local-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  async createUser(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<CreateUserDto> {
    const saltOrRounds = 5;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(
      email,
      username,
      hashedPassword,
    );

    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res() res: Response, @Request() req): Promise<string> {
    return this.authService.login(res, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): User {
    return req.user;
  }
}
