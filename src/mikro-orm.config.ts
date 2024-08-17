import { defineConfig } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import 'dotenv/config';
// import { Logger } from '@nestjs/common';

// const logger = new Logger('MikroORM');

export default defineConfig({
  driver: PostgreSqlDriver,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  dbName: process.env.DATABASE_NAME,
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  migrations: {
    path: './src/migrations',
  },
  debug: true,
  extensions: [Migrator],
});
