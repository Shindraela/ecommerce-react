import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotAcceptableException, Res } from '@nestjs/common';
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

  async login(@Res() res: Response, user: LoginUserDto): Promise<string> {
    const payload = {
      username: user.username,
      sub: user._id,
    };
    const refreshToken = await this.createRefreshToken();

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    const accessToken = this.jwtService.sign(payload, { expiresIn: '10m' });

    res.send({
      access_token: accessToken,
    });

    return accessToken;
  }

  async createRefreshToken() {
    const tokenId = randomUUID();
    return this.jwtService.sign({ tokenId: tokenId }, { expiresIn: '7d' });
  }
}
