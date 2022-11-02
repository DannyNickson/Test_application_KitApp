import { Doctor } from "src/doctors/doctors.model";
import { User } from "src/users/users.model";

export class AppointmentCreateDto{
    readonly date:Date;
    readonly doctor: Doctor;
    readonly user: User;
}