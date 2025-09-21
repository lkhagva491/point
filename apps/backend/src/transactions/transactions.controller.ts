import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  Req,
  Query,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { CreateDepositDto } from "./dto/create-deposit.dto";
import { UpdateDepositStatusDto } from "./dto/update-deposit-status.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AdminAuthGuard } from "../auth/guards/admin-auth.guard";

@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("deposit")
  requestDeposit(@Body() createDepositDto: CreateDepositDto) {
    return this.transactionsService.requestDeposit(createDepositDto);
  }

  @UseGuards(AdminAuthGuard)
  @Patch("deposit/:id/status")
  updateDepositStatus(
    @Param("id") id: string,
    @Body() updateDepositStatusDto: UpdateDepositStatusDto,
    @Req() _req: any,
  ) {
    return this.transactionsService.updateDepositStatus(
      id,
      updateDepositStatusDto,
    );
  }

    @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('type') type?: string,
    @Query('status') status?: string,
  ) {
    return this.transactionsService.findAll(page, limit, type, status);
  }

    @UseGuards(JwtAuthGuard)
  @Get("user/:userEmail")
  findByUserEmail(
    @Param("userEmail") userEmail: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('type') type?: string,
    @Query('status') status?: string,
  ) {
    return this.transactionsService.findByUserEmail(userEmail, page, limit, type, status);
  }
}
