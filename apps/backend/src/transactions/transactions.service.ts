import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { CreateDepositDto } from "./dto/create-deposit.dto";
import { UpdateDepositStatusDto } from "./dto/update-deposit-status.dto";
import { Transaction, TransactionDocument } from "./schemas/transaction.schema";
import { UsersService } from "../users/users.service";
import { AdminsService } from "../admins/admins.service";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private readonly usersService: UsersService,
    private readonly adminsService: AdminsService,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const createdTransaction = new this.transactionModel(createTransactionDto);
    return createdTransaction.save();
  }

  async requestDeposit(
    createDepositDto: CreateDepositDto,
  ): Promise<Transaction> {
    const user = await this.usersService.findByEmail(
      createDepositDto.userEmail,
    );
    if (!user) {
      throw new NotFoundException(
        `User with email ${createDepositDto.userEmail} not found`,
      );
    }

    const createdTransaction = new this.transactionModel({
      userId: user._id,
      points: createDepositDto.requestedAmount,
      type: "deposit",
      status: "pending",
      requestedAmount: createDepositDto.requestedAmount,
    });
    return createdTransaction.save();
  }

  async updateDepositStatus(
    id: string,
    updateDepositStatusDto: UpdateDepositStatusDto,
  ): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id).exec();

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    if (transaction.type !== "deposit") {
      throw new BadRequestException(
        `Transaction with ID ${id} is not a deposit request`,
      );
    }

    if (transaction.status !== "pending") {
      throw new BadRequestException(
        `Deposit request with ID ${id} is not pending`,
      );
    }

    const admin = await this.adminsService.findByEmail(
      updateDepositStatusDto.approvedByAdminEmail,
    );
    if (!admin) {
      throw new NotFoundException(
        `Admin with email ${updateDepositStatusDto.approvedByAdminEmail} not found`,
      );
    }

    transaction.status = updateDepositStatusDto.status;
    transaction.approvedByAdminId = admin._id.toString();

    if (updateDepositStatusDto.status === "approved") {
      const user = await this.usersService.findById(
        transaction.userId.toString(),
      );
      if (!user) {
        throw new NotFoundException(
          `User with ID ${transaction.userId.toString()} not found for adding points.`,
        );
      }
      console.log(
        `TransactionsService: Approving deposit for user email: ${user.email} with points: ${transaction.points}`,
      );
      await this.usersService.addPoints(user.email, transaction.points);
    }

    return transaction.save();
  }

  async findAll(): Promise<any[]> {
    const transactions = await this.transactionModel
      .find()
      .populate("userId")
      .exec();
    return transactions.map((transaction) => ({
      ...transaction.toObject(),
      userEmail: transaction.userId ? (transaction.userId as any).email : null,
    }));
  }

  async findByUserEmail(userEmail: string): Promise<Transaction[]> {
    const user = await this.usersService.findByEmail(userEmail);
    if (!user) {
      throw new NotFoundException(`User with email ${userEmail} not found`);
    }
    return this.transactionModel.find({ userId: user._id }).exec();
  }
}
