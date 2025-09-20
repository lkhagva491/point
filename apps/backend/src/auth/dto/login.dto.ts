import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsIn,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "password123" })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: "user", required: false, enum: ["user", "admin"] })
  @IsOptional()
  @IsString()
  @IsIn(["user", "admin"])
  userType?: "user" | "admin";
}
