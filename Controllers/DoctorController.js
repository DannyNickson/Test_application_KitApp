import DoctorService from "../Services/Doctor/DoctorService.js";

class DoctorController {
    async create(req, res) {
        try {
            const user = await DoctorService.create(req.body)
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(e.message)
        }
    }
    async getAll(req,res)
    {
        try {
            const allADoctor = await DoctorService.getAll();
            res.status(200).json(allADoctor);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async getOne(req,res)
    {
        const {id} = req.params;
        try {
            const doctor = await DoctorService.getOne(id);
            res.status(200).json(doctor);
        } catch (error) {
            res.status(401).json(error)
        }
    }
}
export default new DoctorController();