import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentCreateDto } from './dto/appointmentCreate.dto';
import { Appointment } from './appointments.model';
import { ApiOperation, ApiResponse, ApiTags, ApiBody,ApiParam } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
@ApiTags('Appointments API')
@Controller('appointments')
export class AppointmentsController {
  constructor(
    private appointmentsService: AppointmentsService
  ) {}

  @ApiOperation({ summary: 'Create appointment' })
  @ApiBody({ type: [AppointmentCreateDto] })
  @ApiResponse({ status: 200, type: Appointment })
  @Post()
  create(@Body() appointmentDto: AppointmentCreateDto) {
    return this.appointmentsService.createAppointment(appointmentDto);
  }

  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({ status: 200, type: [Appointment] })
  @Get()
  getAll(): Promise<Appointment[]> {
    return this.appointmentsService.findAllAppointment();
  }

  @ApiOperation({ summary: 'Get only active appointment' })
  @ApiResponse({ status: 200, type: [Appointment] })
  @Get('active')
  getAllActive(): Promise<Appointment[]> {
    return this.appointmentsService.findAllActiveAppointments();
  }

  @ApiOperation({ summary: 'Apply appointment' })
  @Put('apply/:id')
  @ApiResponse({ status: 200,type: Appointment })
  async applyAppointment(
    @Param('id') appointmentID: ObjectId,
  ): Promise<Appointment> {   
    return await this.appointmentsService.setActive(appointmentID);
  }

  @ApiOperation({ summary: 'Discard Appointment' })
  @ApiResponse({ status: 200, type: Appointment })
  @Put('discard/:id')
  async discardAppointment(
    @Param('id') appointmentID: ObjectId,
  ): Promise<Appointment> {
    return await this.appointmentsService.setInActive(appointmentID);
  }
}
