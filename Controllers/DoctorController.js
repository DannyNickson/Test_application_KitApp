import DoctorService from "../Services/DoctorService.js";

class DoctorController {
    async create(req, res) {
        try {
            const user = await DoctorService.create(req.body)
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(e.message)
        }
    }
}
export default new DoctorController();