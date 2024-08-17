import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@Entity({
  tableName: 'banners',
})
export class Banner {
  @PrimaryKey()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Property()
  link: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Property({
    nullable: true,
  })
  position?: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
