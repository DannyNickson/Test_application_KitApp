import { Doctor } from '../../doctors/doctors.model';
import { User } from '../../users/users.model';
import { ApiProperty } from '@nestjs/swagger';
export class AppointmentCreateDto {
  @ApiProperty({example:'2022-11-03T17:45:00.003Z',description:"Appointmetn date"})
  readonly date: Date;
  @ApiProperty({example:'6362d9b46fbf9c8165554d46',description:"Doctor ID"})
  readonly doctor: Doctor;
  @ApiProperty({example:'6362d821897ed192b5249d4c',description:"User ID"})
  readonly user: User;
}
