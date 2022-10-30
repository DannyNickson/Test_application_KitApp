import { Router } from "express";
import userRouter from './UserRouter.js'
import doctorRouter from './DoctorRouter.js'
import appointmentRouter from './AppointmentRouter.js'

const router = new Router();

router.use('/user', userRouter)
router.use('/doctor', doctorRouter)
router.use('/appointment', appointmentRouter)

export default router;