import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({
  tableName: 'songs',
})
export class Song {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property({
    default: 0,
  })
  quantity: number;

  @Property({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Property({
    nullable: true,
  })
  thumbnail?: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
