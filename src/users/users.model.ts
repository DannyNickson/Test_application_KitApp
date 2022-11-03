import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Appointment } from '../appointments/appointments.model';
import { ApiProperty } from '@nestjs/swagger';
export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'User`s email',
  })
  @Prop()
  email: string;

  @ApiProperty({
    example: '21234asdjw213',
    description: 'User`s regestration token',
  })
  @Prop()
  reg_token: string;

  @ApiProperty({
    example: './user_photo.png',
    description: 'User`s photo url',
  })
  @Prop({ default: 'photo_url' })
  photo_avatar: string;

  @ApiProperty({
    example: '+380111111111',
    description: 'User`s number',
  })
  @Prop()
  phone: string;

  @ApiProperty({
    example: 'David',
    description: 'User`s name',
  })
  @Prop()
  name: string;

  @ApiProperty({
    example: 'doc',
    description: 'User type',
  })
  @Prop({ default: 'user' })
  type: string;

  @ApiProperty({
    example: '[6362de34b0cde29091a706d4,6362e760d3b9d0b624b289ab,6363c12bb5512d6e99790917]',
    description: 'Appointment IDs',
  })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  })
  appointments: mongoose.Schema.Types.ObjectId[];
}

export const UserModel = SchemaFactory.createForClass(User);
