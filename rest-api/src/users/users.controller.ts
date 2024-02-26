import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
  Res,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User } from '../interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException('Id does not exist!');

    return res.status(HttpStatus.OK).json(user);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatedUser: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersService.update(id, updatedUser);
    if (!user) throw new NotFoundException('Id does not exist!');

    return user;
  }
}
