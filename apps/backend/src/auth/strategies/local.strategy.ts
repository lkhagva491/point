import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, email: string, password: string): Promise<any> {
    const userType = req.body.userType || 'user';
    const user = await this.authService.validateUser(
      email,
      password,
      userType,
    );
    if (!user) {
      throw new UnauthorizedException('Access denied');
    }
    return user;
  }
}
