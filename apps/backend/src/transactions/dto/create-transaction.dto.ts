import { IsString, IsNumber, IsIn } from "class-validator";

export class CreateTransactionDto {
  @IsString()
  userId: string;

  @IsNumber()
  points: number;

  @IsString()
  @IsIn(["earn", "redeem"])
  type: "earn" | "redeem";
}
