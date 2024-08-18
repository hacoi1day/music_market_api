import { PickType } from '@nestjs/swagger';
import { Song } from 'src/entities/Song.entity';

export class CreateSongDto extends PickType(Song, [
  'name',
  'quantity',
  'thumbnail',
  'description',
]) {}
