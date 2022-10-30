import { setActive } from './AppointmentService';

test("Method must return status active true", ()=>{
    expect(setActive("635e93c996ed02e7e417fdf4").active).toBe(true);
}) 