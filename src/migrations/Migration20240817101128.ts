import { Migration } from '@mikro-orm/migrations';

export class Migration20240817101128 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "dob" date not null, "phone" varchar(255) not null, "avatar" varchar(255) null, "password" varchar(255) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }

}
