import AppointmentService from '../Services/Appointment/AppointmentService.js'
class AppointmentController {
    async create(req, res) {
        try {
            const newAppointment = await AppointmentService.create(req.body);
            res.status(200).json(newAppointment);
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async getAll(req,res)
    {
        try {
            const allAppointments = await AppointmentService.getAll();
            res.status(200).json(allAppointments);
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async getOne(req,res)
    {
        try {
            const {id} = req.params;
            const appointment = await AppointmentService.getOne(id);
            res.status(200).json(appointment);
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async setActive(req,res){
        const {id} = req.params;
        try {
            const appointment = await AppointmentService.setActive(id)
            res.status(200).json(appointment);
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async deleteOne(req,res)
    {
        const {id} = req.params;
        try {
            const appointment = await AppointmentService.deleteOne(id)
            res.status(200)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
export default new AppointmentController();