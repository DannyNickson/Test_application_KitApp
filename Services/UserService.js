import User from '../Schemas/User.schema.js';

class UserService {
    async create(user) {
        const createdUser = await User.create(user);
        return createdUser;
    }
}

export default new UserService();