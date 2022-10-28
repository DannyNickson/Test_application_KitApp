import Router from 'express';
import UserController from '../Controllers/UserController.js';
const router = new Router();

router.post('/users',UserController.create);
router.get('/users');
router.get('/users/:id');
router.put('/users');
router.delete('/users/:id');


export default router;