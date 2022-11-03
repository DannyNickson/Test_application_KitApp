import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { DoctorsModule } from './../doctors/doctors.module';
import { UsersModule } from './../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentModel } from './appointments.model';
import { AppointmentsModule } from './appointments.module';
import { AppointmentsService } from './appointments.service';
describe('AppointmentsController', () => {
  let controller: AppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentsService],
      controllers: [AppointmentsController],
      imports: [
        AppointmentsModule,
      ],
      exports: [AppointmentsModule],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
