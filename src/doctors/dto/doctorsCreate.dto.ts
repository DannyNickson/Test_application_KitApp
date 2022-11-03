import { ApiProperty } from '@nestjs/swagger';
export class CreateDoctorDto{
    @ApiProperty({
        example: 'doctor@gmail.com',
        description: 'Doctor`s email',
      })
    readonly email:string;

    @ApiProperty({
        example: '21234asdjw213',
        description: 'Doctor`s regestration token',
      })
    readonly reg_token: string;

    @ApiProperty({
        example: './doctor_photo.png',
        description: 'Doctor`s photo url',
      })
    readonly photo_avatar: string;

    @ApiProperty({
        example: '+380111111111',
        description: 'Doctor`s number',
      })
    readonly phone: string
    
    @ApiProperty({
        example: 'David',
        description: 'Doctor`s name',
      })
    readonly name: string;
}