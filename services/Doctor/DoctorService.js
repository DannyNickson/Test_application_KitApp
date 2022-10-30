import Doctor from '../../schemas/Doctor.schema.js';

class DoctorService {
    async create(doctor) {
        const createdDoctor = await Doctor.create(doctor);
        return createdDoctor;
    }
    async getAll() {
        const allDoctor = await Doctor.find();
        return allDoctor;
    }
    async getOne(id) {
        const doctor = await Doctor.findById(id).exec();
        return doctor;
    }
    async setFreeStatus(id,status){
        const doctor = await Doctor.findByIdAndUpdate(id).set("free",status);
        return doctor;
    }
    async setAppointmentsAccepted(doctorID,appointmentID)
    {
        const doctor = await this.getOne(doctorID);
        if(!doctor)
        {
            throw new Error(`No doctor with id:${doctorID}`)
        }
        if(doctor.appointments_accepted.length < 3)
        {
            await Doctor.findByIdAndUpdate(doctorID).set('appointments_accepted',[...doctor.appointments_accepted, appointmentID]);
        }
        else{
            if(doctor.free)
            {
                this.setFreeStatus(doctorID,false);
            }
            throw ('Error Doctor has 3 appointment')
        }
        
    }
}

export default new DoctorService();