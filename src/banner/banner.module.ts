import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Banner } from 'src/entities/Banner.entity';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MikroOrmModule.forFeature([Banner]), JwtModule],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
