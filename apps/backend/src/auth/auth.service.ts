import { Injectable, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { AdminsService } from "../admins/admins.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
    userType: "user" | "admin",
  ): Promise<any> {
    let user;

    if (userType === "admin") {
      user = await this.adminsService.findByEmail(email);
    } else {
      user = await this.usersService.findByEmail(email);
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...result } = user.toObject ? user.toObject() : user;
      return { ...result, userType };
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      userType: user.userType,
      role: user.userType === "admin" ? "admin" : "user",
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        username: user.username,
        userType: user.userType,
        role: user.userType === "admin" ? "admin" : "user",
        point: user.point || 0,
        permissions: user.permissions || [],
      },
    };
  }

  async register(
    email: string,
    password: string,
    username: string,
    userType: "user" | "admin" = "user",
  ) {
    if (userType === "admin") {
      const existingAdmin = await this.adminsService.findByEmail(email);
      if (existingAdmin) {
        throw new ConflictException("Email already exists");
      }
    } else {
      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        throw new ConflictException("Email already exists");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (userType === "admin") {
      newUser = await this.adminsService.create({
        email,
        password: hashedPassword,
        username,
        role: "admin",
      });
    } else {
      newUser = await this.usersService.create({
        email,
        password: hashedPassword,
        username,
      });
    }

    const userObject = newUser.toObject ? newUser.toObject() : newUser;
    return this.login({ ...userObject, userType });
  }
}
