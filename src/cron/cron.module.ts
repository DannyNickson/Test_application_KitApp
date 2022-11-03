import { Module } from '@nestjs/common';
import { AppointmentsModule } from '../appointments/appointments.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { UsersModule } from '../users/users.module';
import { CronService } from './cron.service';
import { UsersService } from './../users/users.service';
import { DoctorsService } from './../doctors/doctors.service';
import { AppointmentsService } from './../appointments/appointments.service';
@Module({
  providers: [CronService],
  imports:[UsersModule,DoctorsModule,AppointmentsModule]
})

export class CronModule {}
