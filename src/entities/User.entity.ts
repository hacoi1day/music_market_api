import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@Entity({
  tableName: 'users',
})
export class User {
  @PrimaryKey()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Property()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Property({ unique: true })
  email: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @Property({
    type: 'date',
  })
  dob: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Property()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Property({
    nullable: true,
  })
  avatar?: string;

  @Property()
  @Exclude()
  password: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
