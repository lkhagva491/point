import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";
import { Transaction, TransactionSchema } from "./schemas/transaction.schema";
import { UsersModule } from "../users/users.module";
import { AdminsModule } from "../admins/admins.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    UsersModule,
    AdminsModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService], // Export TransactionsService to be used in other modules if needed
})
export class TransactionsModule {}
