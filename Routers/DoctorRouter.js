import Router from 'express';
import DoctorController from '../Controllers/DoctorController.js';
const router = new Router();

router.post('/doctors',DoctorController.create);
router.get('/doctors');
router.get('/doctors/:id');
router.put('/doctors');
router.delete('/doctors/:id');


export default router;