import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Appointment } from '../appointments/appointments.model';

export type DoctorDocument = Doctor & Document;

@Schema()
export class Doctor {
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
  @Prop({ default: 'doc' })
  type: string;
  @Prop({ default: 'therapist' })
  scpec: string;
  @Prop({ default: true })
  free: boolean;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  })
  appointments_accepted: Appointment[];
}

export const DoctorModel = SchemaFactory.createForClass(Doctor);
