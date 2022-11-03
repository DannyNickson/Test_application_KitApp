import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentCreateDto } from './dto/appointmentCreate.dto';
import { DoctorsService } from './../doctors/doctors.service';
import { UsersService } from './../users/users.service';
import { Appointment } from './appointments.model';
import { ApiOperation, ApiResponse, ApiTags, ApiBody,ApiParam } from '@nestjs/swagger';
@ApiTags('Appointments API')
@Controller('appointments')
export class AppointmentsController {
  constructor(
    private appointmentsService: AppointmentsService,
    private doctorsService: DoctorsService,
    private usersService: UsersService,
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
    @Param('id') appointmentID: Appointment,
  ): Promise<Appointment> {
    const appointment = await this.appointmentsService.getOneAppointment(
      appointmentID,
    );
    await this.doctorsService.addNewAppointment(
      appointmentID,
      appointment.doctor,
    );
    await this.usersService.addActiveAppointment(
      appointmentID,
      appointment.user,
    );
    return await this.appointmentsService.setActive(appointmentID);
  }

  @ApiOperation({ summary: 'Discard Appointment' })
  @ApiResponse({ status: 200, type: Appointment })
  @Put('discard/:id')
  async discardAppointment(
    @Param('id') appointmentID: Appointment,
  ): Promise<Appointment> {
    const appointment = await this.appointmentsService.getOneAppointment(
      appointmentID,
    );
    await this.doctorsService.removeAppointment(
      appointmentID,
      appointment.doctor,
    );
    return await this.appointmentsService.setInActive(appointmentID);
  }
}
