import { Test } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import mongoose from 'mongoose';
import { ModuleMocker } from 'jest-mock';
import { AppointmentsService } from './appointments.service';

describe('AppointmentsController', () => {
  let appointmentsController: AppointmentsController;
  let appointmentsService: AppointmentsService;
  const mockUsersService = {
    createAppointment:jest.fn(dto=>{
      return {
        ...dto,
        _id:new Date(),
        __v:0,
        active:false
      }
    }),
    setActive:jest.fn(id=>{
      return{
        _id: expect.any(Date),
        date: expect.any(Date),
        doctor: '6362d9b46fbf9c8165554d46',
        user: '6362d821897ed192b5249d4c',
        active: true,
        __v: 0,
      }
    })
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [AppointmentsService],
    })
      .overrideProvider(AppointmentsService)
      .useValue(mockUsersService)
      .compile();
    appointmentsService =
      moduleRef.get<AppointmentsService>(AppointmentsService);
    appointmentsController = moduleRef.get<AppointmentsController>(
      AppointmentsController,
    );
  });

  describe('Appointment', () => {
    it('should create anappointment', async () => {
      expect(
        appointmentsController.create({
          date: new Date(),
          doctor: '6362d9b46fbf9c8165554d46',
          user: '6362d821897ed192b5249d4c',
        }),
      ).toEqual({
        _id: expect.any(Date),
        date: expect.any(Date),
        doctor: '6362d9b46fbf9c8165554d46',
        user: '6362d821897ed192b5249d4c',
        active: false,
        __v: 0,
      });
    });

  });
});
