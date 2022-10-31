import AppointmentService from "../services/Appointment/AppointmentService.js";
import fs from 'fs';
import UserService from "../services/User/UserService.js";
import DoctorService from "../Services/Doctor/DoctorService.js";
import path from 'path';

export default async function () {
    const allAcceptedAppointmens = await AppointmentService.getAllAcceptedActive();
    allAcceptedAppointmens.map(async (curr) => {
        let time_diff = Math.round((Date.parse(curr.date) - Date.now())/3600000);
        if (time_diff == 2) {
            const user = await UserService.getOne(curr.user);
            const doctor = await DoctorService.getOne(curr.doctor);
            fs.appendFileSync(`${path.resolve(path.dirname(''))}/cron/logger.log`, `${new Date()}|\n Привет ${user.name}! Напоминаем что вы записаны к ${doctor.scpec} через два часа\n`)
        }
        else if (time_diff == 24) {
            const user = await UserService.getOne(curr.user);
            const doctor = await DoctorService.getOne(curr.doctor);
            fs.appendFileSync(`${path.resolve(path.dirname(''))}/cron/logger.log`, `${new Date()}|\n Привет ${user.name}! Напоминаем что вы записаны к  ${doctor.scpec} на заватра на ${curr.date}\n`)
        }
    })
}