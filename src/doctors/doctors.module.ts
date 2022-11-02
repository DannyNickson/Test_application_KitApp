import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { Doctor, DoctorModel } from './doctors.model';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  providers: [DoctorsService],
  controllers: [DoctorsController],
  imports: [
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorModel }]),
  ],
})
export class DoctorsModule {}
