import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/entities/User.entity';

export class CreateUserDto extends PickType(User, [
  'name',
  'email',
  'dob',
  'phone',
  'avatar',
]) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
