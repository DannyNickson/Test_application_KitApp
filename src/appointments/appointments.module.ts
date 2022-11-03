import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment, AppointmentModel } from './appointments.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './../users/users.module';
import { DoctorsModule } from './../doctors/doctors.module';
@Module({
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentModel },
    ]),
    UsersModule,
    DoctorsModule,
  ],
  exports: [AppointmentsModule],
})
export class AppointmentsModule {}
