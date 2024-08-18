import { Seeder } from '@mikro-orm/seeder';
import { CreateUserSeeder } from './CreateUserSeeder.seeder';
import { EntityManager } from '@mikro-orm/postgresql';
import { CreateSongSeeder } from './CreateSongSeeder.seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await this.call(em, [CreateUserSeeder, CreateSongSeeder]);
  }
}
