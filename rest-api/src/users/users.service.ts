import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async createUser(email: string, password: string): Promise<User> {
    return this.userModel.create({
      email,
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
}
