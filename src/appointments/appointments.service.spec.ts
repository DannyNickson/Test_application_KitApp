import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';
import { DoctorsModule } from './../doctors/doctors.module';
import { UsersModule } from './../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsController } from './appointments.controller';
import { Appointment, AppointmentModel } from './appointments.model';
import { AppointmentsModule } from './appointments.module';
describe('AppointmentsService', () => {
  let service: AppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentsService],
      controllers: [AppointmentsController],
      imports: [
        AppointmentsModule,
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
