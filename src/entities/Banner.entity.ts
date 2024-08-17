import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({
  tableName: 'banners',
})
export class Banner {
  @PrimaryKey()
  id: number;

  @Property()
  link: string;

  @Property({
    nullable: true,
  })
  position?: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
