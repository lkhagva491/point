import { IsString, IsIn, IsEmail } from "class-validator";

export class UpdateDepositStatusDto {
  @IsString()
  @IsIn(["approved", "declined"])
  status: "approved" | "declined";

  @IsEmail()
  approvedByAdminEmail: string;
}
