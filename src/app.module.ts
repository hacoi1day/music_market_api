import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BannerModule } from './banner/banner.module';
import configuration from './config/configuration';
import { SongModule } from './song/song.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        driver: PostgreSqlDriver,
        host: config.get('database.host'),
        port: config.get('database.port'),
        user: config.get('database.user'),
        password: config.get('database.pass'),
        dbName: config.get('database.name'),
        entities: ['./dist/entities'],
        entitiesTs: ['./src/entities'],
        migrations: {
          path: './migrations',
          pattern: /^[\w-]+\d+\.[tj]s$/,
        },
        debug: true,
      }),
    }),
    BannerModule,
    SongModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
