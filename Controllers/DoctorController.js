import Doctor from "../Schemas/Doctor.schema.js";
class DoctorController {
    async create(req, res) {
        try {
            const { email, reg_token, photo_avatar, phone, name } = req.body;
            const user = await Doctor.create({ email, reg_token, photo_avatar, phone, name })
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(e.message)
        } 
    }
}
export default new DoctorController();