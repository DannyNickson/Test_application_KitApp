import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Doctor } from 'src/doctors/doctors.model';
import { User } from 'src/users/users.model';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop({ default: Date.now })
  date: Date;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }] })
  doctor: Doctor;
  @Prop({ default: true })
  active: boolean;
}

export const AppointmentModel = SchemaFactory.createForClass(Appointment);
