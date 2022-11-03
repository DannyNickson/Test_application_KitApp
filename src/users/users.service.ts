import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserDocument } from './users.model';
import { Appointment } from '../appointments/appointments.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOneUser(userID:User): Promise<User> {
    return this.userModel.findById(userID).exec();
  }
  async addActiveAppointment(appointmentID:Appointment,userID:User):Promise<User>{
    const findedUser = await this.userModel.findById(userID).exec();
    if(findedUser.appointments.indexOf(appointmentID) === -1)
      {
        return findedUser.$set("appointments",[...findedUser.appointments,appointmentID]).save();
      }
      throw new HttpException("BadRequest. Same Appointment Cannot be Accepted",HttpStatus.BAD_REQUEST);
  }
  async removeActiveAppointment(appointmentID:Appointment,userID:User):Promise<User>{
    const findedUser = await this.userModel.findById(userID).exec();
    let appointmentArray = findedUser.appointments;
    if(appointmentArray.indexOf(appointmentID) === -1)
      {
        throw new HttpException("BadRequest. User doesn't have this appointment",HttpStatus.BAD_REQUEST);
      }
      appointmentArray.splice(appointmentArray.indexOf(appointmentID),1);
      return await findedUser.$set('appointments',[...appointmentArray]).save();
  }
}
