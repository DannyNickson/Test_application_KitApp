import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Appointment } from '../appointments/appointments.model';
import { ApiProperty } from '@nestjs/swagger';
export type DoctorDocument = Doctor & Document;

@Schema()
export class Doctor {
  @ApiProperty({
    example: 'doctor@gmail.com',
    description: 'Doctor`s email',
  })
  @Prop()
  email: string;

  @ApiProperty({
    example: '21234asdjw213',
    description: 'Doctor`s regestration token',
  })
  @Prop()
  reg_token: string;

  @ApiProperty({
    example: './doctor_photo.png',
    description: 'Doctor`s photo url',
  })
  @Prop({ default: 'photo_url' })
  photo_avatar: string;

  @ApiProperty({
    example: '+380111111111',
    description: 'Doctor`s number',
  })
  @Prop()
  phone: string;

  @ApiProperty({
    example: 'David',
    description: 'Doctor`s name',
  })
  @Prop()
  name: string;

  @ApiProperty({
    example: 'doc',
    description: 'User type',
  })
  @Prop({ default: 'doc' })
  type: string;

  @ApiProperty({
    example: 'therapist',
    description: 'Type of specialist',
  })
  @Prop({ default: 'therapist' })
  scpec: string;

  @ApiProperty({
    example: 'true',
    description: 'Is doctor free',
  })
  @Prop({ default: true })
  free: boolean;

  @ApiProperty({
    example: '[6362de34b0cde29091a706d4,6362e760d3b9d0b624b289ab,6363c12bb5512d6e99790917]',
    description: 'Appointment IDs',
  })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  })
  appointments_accepted: Appointment[];
}

export const DoctorModel = SchemaFactory.createForClass(Doctor);
