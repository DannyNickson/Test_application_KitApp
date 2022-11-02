import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './appointments.model';
import { AppointmentCreateDto } from './dto/appointmentCreate.dto';

@Injectable()
export class AppointmentsService {
    constructor(@InjectModel(Appointment.name) private appointmentModel:Model<AppointmentDocument>){}
    async createAppointment(createDto:AppointmentCreateDto):Promise<Appointment> {
        const createdAppointment = new this.appointmentModel(createDto);
        return createdAppointment.save();
    }
    async findAllAppointment():Promise<Appointment[]>{
        return this.appointmentModel.find().exec();
    }
}
