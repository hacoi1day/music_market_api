import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Song } from 'src/entities/Song.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MikroOrmModule.forFeature([Song]), JwtModule],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
