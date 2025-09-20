import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId; // Explicitly define _id

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: "user" }) // Add role property with default 'user'
  role: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  point: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
