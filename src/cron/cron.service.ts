import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Appointment } from '../appointments/appointments.model';
import { DoctorsService } from '../doctors/doctors.service';
import { UsersService } from '../users/users.service';
import { AppointmentsService } from './../appointments/appointments.service';
import * as fs from "fs";
import * as path from 'path'

@Injectable()
export class CronService {

    constructor (private appointmentsService:AppointmentsService,private usersService:UsersService,private doctorsService:DoctorsService){}
    @Cron(CronExpression.EVERY_HOUR)
    async handleCron()
    {
        const allAcriveAppointments:Appointment[] = await this.appointmentsService.findAllActiveAppointments();
        allAcriveAppointments.map(async (curr:Appointment) => {
            let time_diff = Math.round((curr.date.valueOf() - Date.now())/3600000);
            if (time_diff == 2) {
                const user = await this.usersService.findOneUser(curr.user);
                const doctor = await this.doctorsService.findOneDoctor(curr.doctor);
                fs.appendFileSync(`${path.resolve(path.dirname(''))}/log/logger.log`, `${new Date()}|\n Привет ${user.name}! Напоминаем что вы записаны к ${doctor.scpec} через два часа\n`)
            }
            else if (time_diff == 24) {
                const user = await this.usersService.findOneUser(curr.user);
                const doctor = await this.doctorsService.findOneDoctor(curr.doctor);
                fs.appendFileSync(`${path.resolve(path.dirname(''))}/log/logger.log`, `${new Date()}|\n Привет ${user.name}! Напоминаем что вы записаны к  ${doctor.scpec} на заватра на ${curr.date}\n`)
            }
        })
    }
}
