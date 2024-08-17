import { PickType } from '@nestjs/swagger';
import { Banner } from 'src/entities/Banner.entity';

export class CreateBannerDto extends PickType(Banner, ['link', 'position']) {}
