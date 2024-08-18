import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Song } from 'src/entities/Song.entity';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: EntityRepository<Song>,
    private readonly em: EntityManager,
  ) {}

  async create(createSongDto: CreateSongDto) {
    const song = await this.songRepository.create(createSongDto);
    await this.em.flush();
    return song;
  }

  async findAll() {
    return this.songRepository.findAll();
  }

  async paginate(page = 1, limit = 10) {
    const songs = await this.songRepository.find(
      {},
      {
        limit,
        offset: (page - 1) * limit,
      },
    );
    return songs;
  }

  async findOne(id: number) {
    const song = await this.songRepository.findOne({
      id,
    });

    if (!song) {
      throw new NotFoundException(`Song #${id} not found`);
    }

    return song;
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    const song = await this.findOne(id);
    wrap(song).assign(updateSongDto);
    await this.em.flush();

    return song;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.songRepository.nativeDelete({
      id,
    });

    return id;
  }
}
