import AppointmentService from './AppointmentService.js'
import UserService from '../User/UserService.js'
import DoctorService from '../Doctor/DoctorService.js'
describe("Appointment service testing",()=>{
    let userReqBody = {
        "email":"puchkovdd@gmail.com",
        "reg_token":"1234",
        "phone":"+380984551789",
        "name":"DannyNicksonJunior"
    }
    let doctorReqBody ={
        "email":"puchkovdd@gmail123.com",
        "reg_token":"12qwrqwr34",
        "phone":"+380984551789",
        "name":"DannyNicksonJunior"
    }
    UserService.create(userReqBody);
     DoctorService.create(doctorReqBody);
    beforeAll(async ()=>{
        let appointmentReqBody = {
            "user":userReqBody._id,
            "doctor":doctorReqBody._id
        }
        let appointment  = await AppointmentService.create(appointmentReqBody)
    })
    test("equal",()=>{
        const expected_value = AppointmentService.setActive(appointment._id);
        expect(expected_value).toBe(true);
    })
})