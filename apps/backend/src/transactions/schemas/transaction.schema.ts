import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  points: number;

  @Prop({ required: true, enum: ["earn", "redeem", "deposit"] })
  type: "earn" | "redeem" | "deposit";

  @Prop({ enum: ["pending", "approved", "declined"], default: "pending" })
  status?: "pending" | "approved" | "declined";

  @Prop()
  requestedAmount?: number;

  @Prop()
  approvedByAdminId?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
