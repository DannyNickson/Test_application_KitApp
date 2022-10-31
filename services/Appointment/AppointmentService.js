import { now } from 'mongoose';
import Appointment from '../../schemas/Appointment.schema.js';
import DoctorService from '../Doctor/DoctorService.js';
import UserService from '../User/UserService.js';
import fs from 'fs';
class AppointmentService {
    async create(appointment) {
        if(appointment.date)
        {
            appointment.date = new Date(appointment.date);
        }
        const createdAppointment = await Appointment.create(appointment);
        return createdAppointment;
    }
    async getAll() {
        const allAppointments = await Appointment.find();
        return allAppointments;
    }
    async getOne(id) {
        const appointment = await Appointment.findById(id).exec();
        return appointment;
    }
    async setActive(id) {
        if (!id) {
            throw ("No id. ID requered");
        }
        const appointment = await this.getOne(id);
        if (!appointment) {
            throw (`No user with id:${id}`)
        }
        const doctorAccepted = await DoctorService.getOne(appointment.doctor);
        if (!doctorAccepted) {
            throw (`No docotor with id:${appointment.doctor}`)
        }
        if(!doctorAccepted.free)
        {
            throw ("Error Doctor has 3 appointment");
        }
        await DoctorService.setAppointmentsAccepted(appointment.doctor, id)
        await UserService.updateAppointment(appointment.user,id);
        return await Appointment.findByIdAndUpdate(id).set("active", true);
    }
    async deleteOne(id)
    {
        const appointment = await this.getOne(id);
        await DoctorService.deleteAppointment(appointment.doctor,id);
        await UserService.deleteAppointment(appointment.user,id);
        return await Appointment.findByIdAndDelete(id);
    }
    async getAllByDoctorId(docotrID)
    {
        const appointments= await Appointment.find({doctor:docotrID,active:false});
        return appointments;
    }
    async getAllAcceptedActive(){
        const appointment = await Appointment.find({active:true});
        return appointment;
    }
}

export default new AppointmentService();