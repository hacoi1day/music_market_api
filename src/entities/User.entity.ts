import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

@Entity({
  tableName: 'users',
})
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property({ unique: true })
  email: string;

  @Property({
    type: 'date',
  })
  dob: Date;

  @Property()
  phone: string;

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
