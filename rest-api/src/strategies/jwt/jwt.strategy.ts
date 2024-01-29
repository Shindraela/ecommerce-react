import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { JwtType } from 'src/types/jwt.type';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtType): Promise<LoginUserDto> {
    const user = await this.usersService.findById(payload._id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
