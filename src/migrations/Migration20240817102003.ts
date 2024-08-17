import { Migration } from '@mikro-orm/migrations';

export class Migration20240817102003 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table "banners" ("id" serial primary key, "link" varchar(255) not null, "position" int null, "created_at" timestamptz not null, "updated_at" timestamptz not null);',
    );
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "banners" cascade;');
  }
}
