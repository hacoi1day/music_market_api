import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { SongFactory } from '../factories/Song.factory';

export class CreateSongSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const songs = new SongFactory(em).make(10000);
    await em.persistAndFlush(songs);
  }
}
