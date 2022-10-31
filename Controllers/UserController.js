
import UserService from '../Services/User/UserService.js';
class UserController {
    async create(req, res) {
        try {
            const user = await UserService.create(req.body)
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async getAll(req,res)
    {
        try {
            const allUser = await UserService.getAll();
            res.status(200).json(allUser);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async getOne(req,res)
    {
        try {
            const {id} = req.params;
            const user = await UserService.getOne(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
export default new UserController();