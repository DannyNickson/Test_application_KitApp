import Router from 'express';
import AppointmentController from '../Controllers/AppointmentController.js';
const router = new Router();

router.post('/',AppointmentController.create);
router.get('/',AppointmentController.getAll);
router.get('/:id',AppointmentController.getOne);
router.put('/makeactive/:id',AppointmentController.setActive);
router.delete('/:id',AppointmentController.deleteOne);
router.get('/fordoctor/:id',AppointmentController.getAllByDoctorId);


export default router;