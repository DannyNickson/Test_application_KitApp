import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentCreateDto } from './dto/appointmentCreate.dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(private appointmentsService: AppointmentsService) {}

    @Post()
    create(@Body() appointmentDto: AppointmentCreateDto) {
      return this.appointmentsService.createAppointment(appointmentDto);
    }
    @Get()
    getAll() {
      return this.appointmentsService.findAllAppointment();
    }
}
