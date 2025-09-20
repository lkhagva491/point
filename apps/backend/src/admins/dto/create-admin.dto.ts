import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
  IsNumber,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
  @ApiProperty({ example: "AdminUser" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: "admin@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "password123", minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "admin", required: false })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  permissions?: number;
}
