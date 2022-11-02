import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Appointment } from '../appointments/appointments.model';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;
  @Prop()
  reg_token: string;
  @Prop({ default: 'photo_url' })
  photo_avatar: string;
  @Prop()
  phone: string;
  @Prop()
  name: string;
  @Prop({ default: 'user' })
  type: string;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  })
  appointments: Appointment[];
}

export const UserModel = SchemaFactory.createForClass(User);
