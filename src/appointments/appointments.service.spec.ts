import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';


describe('AppointmentsService', () => {
  let appointmentService :AppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentsService]
    }).compile();

    appointmentService = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(appointmentService).toBeDefined();
  });
});
