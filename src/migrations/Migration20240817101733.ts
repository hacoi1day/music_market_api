import { Migration } from '@mikro-orm/migrations';

export class Migration20240817101733 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "songs" ("id" serial primary key, "name" varchar(255) not null, "quantity" int not null default 0, "description" text null, "thumbnail" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null);');
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "songs" cascade;');
  }

}
