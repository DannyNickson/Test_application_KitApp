import User from '../../schemas/User.schema.js';

class UserService {
    async create(user) {
        const createdUser = await User.create(user);
        return createdUser;
    }
    async getAll() {
        const allUser = await User.find();
        return allUser;
    }
    async getOne(id) {
        const user = await User.findOne({
            where: { id }
        })
        return user;
    }
    async deleteAppointment(userID,appointmentID)
    {
        let newAppointments = await this.getOne(userID).appointments;
        await Doctor.findByIdAndUpdate(userID).set('appointments',newAppointments.splice(newAppointments.indexOf(appointmentID),1));
    }
    async updateAppointment(userID,appointmentID)
    {
        const user = await this.getOne(userID);
        await User.findByIdAndUpdate(userID).set('appointments', [...user.appointments, appointmentID])
    }
}

export default new UserService();