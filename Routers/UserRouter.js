import Router from 'express';
import UserController from '../controllers/UserController.js';
const router = new Router();

router.post('/', UserController.create);
router.get('/',UserController.getAll);
router.get('/:id',UserController.getOne);
router.put('/');
router.delete('/:id');


export default router;