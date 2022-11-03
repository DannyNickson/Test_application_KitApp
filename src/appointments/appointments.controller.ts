import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentCreateDto } from './dto/appointmentCreate.dto';
import { DoctorsService } from './../doctors/doctors.service';
import { UsersService } from './../users/users.service';
import { Appointment } from './appointments.model';

@Controller('appointments')
export class AppointmentsController {
    constructor(private appointmentsService: AppointmentsService, private doctorsService:DoctorsService, private usersService:UsersService) {}

    @Post()
    create(@Body() appointmentDto: AppointmentCreateDto) {
      return this.appointmentsService.createAppointment(appointmentDto);
    }
    @Get()
    getAll():Promise<Appointment[]> {
      return this.appointmentsService.findAllAppointment();
    }
    @Put("apply/:id")
    async applyAppointment(@Param("id") appointmentID:Appointment):Promise<Appointment>{
        const appointment = await this.appointmentsService.getOneAppointment(appointmentID);
        await this.doctorsService.addNewAppointment(appointmentID,appointment.doctor);
        await this.usersService.addActiveAppointment(appointmentID,appointment.user);
        return await this.appointmentsService.setActive(appointmentID);
    }
    @Put("discard/:id")
    async discardAppointment(@Param("id") appointmentID:Appointment):Promise<Appointment>{
      const appointment = await this.appointmentsService.getOneAppointment(appointmentID);
      await this.doctorsService.removeAppointment(appointmentID,appointment.doctor);
      return await this.appointmentsService.setInActive(appointmentID);
  }
}
