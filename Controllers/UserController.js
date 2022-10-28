import User from '../Schemas/User.schema.js'

class UserController {
    async create(req, res) {
        try {
            const { email, reg_token, photo_avatar, phone, name } = req.body;
            const user = await User.create({ email, reg_token, photo_avatar, phone, name })
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(e.message)
        }
    }
}
export default new UserController();