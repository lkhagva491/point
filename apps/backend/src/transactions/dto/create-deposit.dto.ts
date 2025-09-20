import { IsEmail, IsNumber, Min } from "class-validator";

export class CreateDepositDto {
  @IsEmail()
  userEmail: string;

  @IsNumber()
  @Min(1)
  requestedAmount: number;
}
