import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { randomUUID } from 'crypto';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.getUser({ username });

    if (!user) return null;
    const passwordValid = await bcrypt.compare(pass, user.password);

    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }

    return null;
  }

  async login(user: LoginUserDto, @Res() res: Response): Promise<string> {
    const accessToken = await this.createAccessToken(user._id);
    const refreshToken = await this.createRefreshToken(user._id);

    res
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .send({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

    return accessToken;
  }

  async createAccessToken(userId: string): Promise<string> {
    return this.jwtService.sign({ _id: userId }, { expiresIn: '10m' });
  }

  async createRefreshToken(userId: string): Promise<string> {
    const tokenId = randomUUID();

    return this.jwtService.sign(
      { _id: userId, tokenId: tokenId },
      { expiresIn: '7d' },
    );
  }

  async decodeRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
