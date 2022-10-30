import Appointment from '../../schemas/Appointment.schema.js';
import User from '../../schemas/User.schema.js'
import Doctor from '../../schemas/Doctor.schema.js'
import DoctorService from '../Doctor/DoctorService.js';
class AppointmentService {
    async create(appointment) {
        const createdAppointment = await Appointment.create(appointment);
        const changedUser = await User.findById( appointment.user );
        if (!changedUser) {
            throw (`No user with id:${appointment.user}`)
        }
        await User.findByIdAndUpdate(appointment.user).set('appointments', [...changedUser.appointments, createdAppointment.id])
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
            throw new Error("No id. ID requered");
        }
        const appointment = await this.getOne(id);
        if (!appointment) {
            throw new Error(`No user with id:${id}`)
        }
        const doctorAccepted = await DoctorService.getOne(appointment.doctor);
        if (!doctorAccepted) {
            throw new Error(`No docotor with id:${appointment.doctor}`)
        }
        if(!doctorAccepted.free)
        {
            throw ("Error Doctor has 3 appointment");
        }
        await DoctorService.setAppointmentsAccepted(appointment.doctor, id)
        return await Appointment.findByIdAndUpdate(id).set("active", true);
    }
}

export default new AppointmentService();