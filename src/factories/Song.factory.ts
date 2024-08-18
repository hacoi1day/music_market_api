import { faker } from '@faker-js/faker';
import { Factory } from '@mikro-orm/seeder';
import { Song } from '../entities/Song.entity';

export class SongFactory extends Factory<Song> {
  model = Song;

  definition(): Partial<Song> {
    return {
      name: faker.person.fullName(),
      description: faker.person.fullName(),
      quantity: Math.round(Math.random() * 100),
      thumbnail: '',
    };
  }
}
