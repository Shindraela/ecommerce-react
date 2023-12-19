import * as bcrypt from 'bcrypt';
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  async createUser(
    @Body('password') password: string,
    @Body('email') email: string,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(email, hashedPassword);

    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body('password') password: string,
    @Body('email') email: string,
  ) {
    return this.authService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
