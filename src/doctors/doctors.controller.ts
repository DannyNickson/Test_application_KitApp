import { Body, Controller, Get, Post } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/doctorsCreate.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Doctor } from 'src/doctors/doctors.model';
@ApiTags('Doctors API')
@Controller('doctors')
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @ApiOperation({ summary: 'Create doctor' })
  @ApiResponse({ status: 200, type: Doctor })
  @Post()
  create(@Body() doctorDto: CreateDoctorDto) {
    return this.doctorsService.createDoctor(doctorDto);
  }

  @ApiOperation({ summary: 'Create appointment' })
  @ApiResponse({ status: 200, type: [Doctor] })
  @Get()
  getAll() {
    return this.doctorsService.findAllDoctor();
  }
}
