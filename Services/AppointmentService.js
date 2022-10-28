import Appointment from '../Schemas/Appointment.schema.js';

class AppointmentService {
    async create(appointment) {
        const createdAppointment = await Appointment.create(appointment);
        return createdAppointment;
    }
}

export default new AppointmentService();