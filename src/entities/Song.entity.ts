import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@Entity({
  tableName: 'songs',
})
export class Song {
  @PrimaryKey()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Property()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Property({
    default: 0,
  })
  quantity: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Property({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Property({
    nullable: true,
  })
  thumbnail?: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
