import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'User`s email',
  })
  readonly email: string;

  @ApiProperty({
    example: '21234asdjw213',
    description: 'User`s regestration token',
  })
  readonly reg_token: string;

  @ApiProperty({
    example: './user_photo.png',
    description: 'User`s photo url',
  })
  readonly photo_avatar: string;

  @ApiProperty({
    example: '+380111111111',
    description: 'User`s number',
  })
  readonly phone: string;

  @ApiProperty({
    example: 'David',
    description: 'User`s name',
  })
  readonly name: string;
}
