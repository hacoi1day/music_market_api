import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Banner } from 'src/entities/Banner.entity';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';

@Module({
  imports: [MikroOrmModule.forFeature([Banner])],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
