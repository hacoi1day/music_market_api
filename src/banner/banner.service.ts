import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Banner } from 'src/entities/Banner.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: EntityRepository<Banner>,
  ) {}

  create(createBannerDto: CreateBannerDto) {
    return 'This action adds a new banner';
  }

  async findAll(): Promise<Banner[]> {
    return this.bannerRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} banner`;
  }

  update(id: number, updateBannerDto: UpdateBannerDto) {
    return `This action updates a #${id} banner`;
  }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
