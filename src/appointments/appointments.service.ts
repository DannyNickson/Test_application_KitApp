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
    async getOneAppointment(appointmentID:Appointment):Promise<Appointment>{
        return this.appointmentModel.findById(appointmentID).exec();
    }
    
    async setActive(appointmentID:Appointment):Promise<Appointment>{
        const nonActiveAppointment = await this.appointmentModel.findById(appointmentID).exec();
        if(nonActiveAppointment.active == false)
        {
            nonActiveAppointment.$set("active",'true');
        }
        return nonActiveAppointment.save();
    }
    async removeAppointment(appointmentID:Appointment):Promise<Appointment>{
        return await this.appointmentModel.findByIdAndRemove(appointmentID).exec();
    }
    async setInActive(appointmentID:Appointment):Promise<Appointment>{
        const nonActiveAppointment = await this.appointmentModel.findById(appointmentID).exec();
        if(nonActiveAppointment.active == true)
        {
            nonActiveAppointment.$set("active",'false');
        }
        return nonActiveAppointment.save();
    }
}
