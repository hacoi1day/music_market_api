import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../entities/user.entity';

export class CreateUserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = em.create(User, {
      name: `user-${Math.random()}`,
      email: `user-${Math.random()}@example.com`,
      dob: new Date(),
      phone: '0123456789',
      password: '$2b$10$CsbOPtqi/NugOuYGCUHxfOkyXA8vrZn3vgXa56i02NMeHqjsN26Mm', // string
    });

    await em.persistAndFlush([user]);
  }
}
