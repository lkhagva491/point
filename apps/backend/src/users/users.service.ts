import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select("-password").exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).select("-password").exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateByEmail(
    email: string,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<User> {
    try {
      return await this.userModel
        .findOneAndUpdate({ email }, updateUserDto, { new: true })
        .select("-password")
        .exec();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException("Email already exists");
      }
      throw error;
    }
  }

  async changePassword(
    email: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid current password");
    }

    if (
      changePasswordDto.newPassword !== changePasswordDto.confirmNewPassword
    ) {
      throw new BadRequestException(
        "New password and confirm password do not match",
      );
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    user.password = hashedPassword;
    await user.save();
  }

  async addPoints(userEmail: string, points: number): Promise<User> {
    
    const user = await this.userModel.findOne({ email: userEmail }).exec();
    if (!user) {
      
      throw new NotFoundException("User not found");
    }
    
    user.point = (user.point || 0) + points;
    return user.save();
  }

  async removeByEmail(email: string): Promise<User> {
    return this.userModel.findOneAndDelete({ email }).exec();
  }
}
