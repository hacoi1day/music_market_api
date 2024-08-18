import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MinioService } from 'src/minio/minio.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly minioService: MinioService,
    private readonly configService: ConfigService,
  ) {}

  async upload(file: Express.Multer.File) {
    const host = this.configService.get('host');
    const data = await this.minioService.uploadFile(file);

    return {
      url: `${host}/api/upload/${data.objectName}`,
    };
  }

  async get(file: string) {
    return await this.minioService.getObject(file);
  }
}
