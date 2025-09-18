import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AdminsService } from '../admins/admins.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    let user = await this.usersService.findByEmail(email);
    let userType: 'user' | 'admin' = 'user';

    if (!user) {
      const admin = await this.adminsService.findByEmail(email);
      if (admin) {
        user = {
          ...admin,
          point: 0, // Default for admins
        };
        userType = 'admin';
      }
    }

    if (user && await bcrypt.compare(password, user.password)) {
      // password field-ийг салгаж хаяна
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return { ...result, userType };
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user._id,
      userType: user.userType,
      role: user.userType === 'admin' ? 'admin' : 'user',
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        userType: user.userType,
        role: user.userType === 'admin' ? 'admin' : 'user',
        point: user.point || 0,
        permissions: user.permissions || [],
      },
    };
  }

  async register(
    email: string,
    password: string,
    username: string,
    userType: 'user' | 'admin' = 'user',
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (userType === 'admin') {
      const admin = await this.adminsService.create({
        email,
        password: hashedPassword,
        username,
        role: 'admin',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = admin;
      return result;
    } else {
      const user = await this.usersService.create({
        email,
        password: hashedPassword,
        username,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
  }
}
