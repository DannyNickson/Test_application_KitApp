import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model, ObjectId } from 'mongoose';
import { Appointment, AppointmentDocument } from './appointments.model';
import { AppointmentCreateDto } from './dto/appointmentCreate.dto';
import { UsersService } from './../users/users.service';
import { DoctorsService } from './../doctors/doctors.service';
import * as fs from "fs";
import * as path from 'path'

@Injectable()
export class AppointmentsService {
    constructor(@InjectModel(Appointment.name) private appointmentModel:Model<AppointmentDocument>,private usersService:UsersService,private doctorsService:DoctorsService){}
    private readonly logger = new Logger(AppointmentsService.name);

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
    
    async setActive(appointmentID:ObjectId):Promise<Appointment>{
        const nonActiveAppointment = await this.appointmentModel.findById(appointmentID).exec();
        await this.doctorsService.addNewAppointment(
            appointmentID,
            nonActiveAppointment.doctor,
          );
          await this.usersService.addActiveAppointment(
            appointmentID,
            nonActiveAppointment.user,
          );
        if(nonActiveAppointment.active == false)
        {
            nonActiveAppointment.$set("active",'true');
        }
        return nonActiveAppointment.save();
    }
    async removeAppointment(appointmentID:ObjectId):Promise<Appointment>{
        return await this.appointmentModel.findByIdAndRemove(appointmentID).exec();
    }
    async setInActive(appointmentID:ObjectId):Promise<Appointment>{
        const nonActiveAppointment = await this.appointmentModel.findById(appointmentID).exec();
          await this.doctorsService.removeAppointment(
            appointmentID,
            nonActiveAppointment.doctor,
          );
        if(nonActiveAppointment.active == true)
        {
            nonActiveAppointment.$set("active",'false');
        }
        return nonActiveAppointment.save();
    }

    async findAllActiveAppointments():Promise<Appointment[]>{
        return this.appointmentModel.find({active:true,date:{$gte:new Date()}}).exec();
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron()
    {
        const allAcriveAppointments:Appointment[] = await this.findAllActiveAppointments();
        allAcriveAppointments.map(async (curr:Appointment) => {
            let time_diff = Math.round((curr.date.valueOf() - Date.now())/60000);//counting in minuts
             if (time_diff == 120) {
                const user = await this.usersService.findOneUser(curr.user);
                const doctor = await this.doctorsService.findOneDoctor(curr.doctor);
                fs.appendFileSync(`${path.resolve(path.dirname(''))}/log/logger.log`, `${new Date()}|\n Привет ${user.name}! Напоминаем что вы записаны к ${doctor.scpec} через два часа\n`)
            }
            else if (time_diff == 1440) {
                const user = await this.usersService.findOneUser(curr.user);
                const doctor = await this.doctorsService.findOneDoctor(curr.doctor);
                fs.appendFileSync(`${path.resolve(path.dirname(''))}/log/logger.log`, `${new Date()}|\n Привет ${user.name}! Напоминаем что вы записаны к  ${doctor.scpec} на заватра на ${curr.date}\n`)
            }
        })

    }
}
