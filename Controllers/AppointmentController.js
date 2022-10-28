import AppointmentService from '../Services/AppointmentService.js'
class AppointmentController {
    async create(req, res) {
        try {
            const newAppointment = await AppointmentService.create(req.body);
            res.status(200).json(newAppointment);
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
export default new AppointmentController();