import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Doctor } from '../doctors/doctors.model';
import { User } from '../users/users.model';
import { ApiProperty } from '@nestjs/swagger';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {

  _id:string

  @ApiProperty({
    example: '2022-11-04T15:30:00.003Z',
    description: 'Appointment date',
  })
  @Prop({ default: Date.now })
  date: Date;

  @ApiProperty({ example: '6362d821897ed192b5249d4c', description: 'User ID' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User;

  @ApiProperty({
    example: '6362d9b46fbf9c8165554d46',
    description: 'Doctor ID',
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }] })
  doctor: Doctor;

  @ApiProperty({ example: 'false', description: 'Is appointment active' })
  @Prop({ default: false })
  active: boolean;
}

export const AppointmentModel = SchemaFactory.createForClass(Appointment);
