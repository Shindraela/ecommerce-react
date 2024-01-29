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
import * as dotenv from 'dotenv';
dotenv.config();

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

    res.send({
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

  decodeRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async replaceRefreshToken(userId: string, tokenId: string) {
    // Invalidate the old token by any means, e.g., storing the used token ID in a blacklist.
    // Here, you might also check against a list of previously issued tokens for this user.
    console.log('tokenId :', tokenId);

    // Throw an error if the access token replaces the refresh token
    if (!tokenId) throw new UnauthorizedException('Invalid refresh token');

    return this.createRefreshToken(userId); // Generate a new token as shown previously
  }
}
