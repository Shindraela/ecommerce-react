import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async createUser(
    email: string,
    username: string,
    password: string,
  ): Promise<User> {
    return this.userModel.create({
      email,
      username,
      password,
    });
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findById(id): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async update(id: string, updatedUser: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate({ _id: id }, updatedUser, { returnDocument: 'after' })
      .exec();

    return user;
  }
}
