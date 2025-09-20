import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto {
  @ApiProperty({ example: "currentPassword123" })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({ example: "newPassword456" })
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({ example: "newPassword456" })
  @IsString()
  @IsNotEmpty()
  confirmNewPassword: string;
}
