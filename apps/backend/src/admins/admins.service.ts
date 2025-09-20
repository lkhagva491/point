import { Injectable, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Admin, AdminDocument } from "./schemas/admin.schema";
import { CreateAdminDto } from "./dto/create-admin.dto";

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const createdAdmin = new this.adminModel(createAdminDto);
    return createdAdmin.save();
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().select("-password").exec();
  }

  async findById(id: string): Promise<Admin> {
    return this.adminModel.findById(id).select("-password").exec();
  }

  async findByEmail(email: string): Promise<Admin> {
    return this.adminModel.findOne({ email }).exec();
  }

  async updateByEmail(
    email: string,
    updateAdminDto: Partial<CreateAdminDto>,
  ): Promise<Admin> {
    try {
      return await this.adminModel
        .findOneAndUpdate({ email }, updateAdminDto, { new: true })
        .select("-password")
        .exec();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException("Email already exists");
      }
      throw error;
    }
  }

  async removeByEmail(email: string): Promise<Admin> {
    return this.adminModel.findOneAndDelete({ email }).exec();
  }
}
