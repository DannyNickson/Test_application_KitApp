import { Body, Controller, Get, Post } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/doctorsCreate.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @Post()
  create(@Body() doctorDto: CreateDoctorDto) {
    return this.doctorsService.createDoctor(doctorDto);
  }
  @Get()
  getAll() {
    return this.doctorsService.findAllDoctor();
  }
}
