import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Banner } from 'src/entities/Banner.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { wrap } from '@mikro-orm/core';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: EntityRepository<Banner>,
    private readonly em: EntityManager,
  ) {}

  async create(createBannerDto: CreateBannerDto) {
    const banner = await this.bannerRepository.create(createBannerDto);
    await this.em.flush();
    return banner;
  }

  async findAll(): Promise<Banner[]> {
    return this.bannerRepository.findAll();
  }

  async findOne(id: number) {
    const banner = await this.bannerRepository.findOne({
      id,
    });
    if (!banner) {
      throw new NotFoundException(`Banner #${id} not found`);
    }

    return banner;
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    const banner = await this.findOne(id);
    wrap(banner).assign(updateBannerDto);
    await this.em.flush();

    return banner;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.bannerRepository.nativeDelete({
      id,
    });

    return id;
  }
}
