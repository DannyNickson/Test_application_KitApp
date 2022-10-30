import Router from 'express';
import DoctorController from '../Controllers/DoctorController.js';
import appointmentAceptanceMiddleware from '../middleware/appointmentAceptanceMiddleware.js';
const router = new Router();

router.post('/',DoctorController.create);
router.get('/',DoctorController.getAll);
router.get('/:id',DoctorController.getOne);
router.put('/');
router.delete('/:id');


export default router;