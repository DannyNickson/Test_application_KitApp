import Doctor from '../Schemas/Doctor.schema.js';

class DoctorService {
    async create(doctor) {
        const createdDoctor = await Doctor.create(doctor);
        return createdDoctor;
    }
}

export default new DoctorService();