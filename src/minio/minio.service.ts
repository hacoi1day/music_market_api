import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { generateFileNameSlug } from 'src/utils/slug';
import { Upload } from './classes/Upload.class';

@Injectable()
export class MinioService {
  private readonly minioClient: Minio.Client;
  private readonly logger = new Logger(MinioService.name);

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('minio.host'),
      port: this.configService.get('minio.port'),
      useSSL: this.configService.get('minio.useSSL'),
      accessKey: this.configService.get('minio.accessKey'),
      secretKey: this.configService.get('minio.secretKey'),
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<Upload> {
    const bucketName = this.configService.get('minio.bucket');
    const originalname = generateFileNameSlug(file.originalname);
    const objectName = `${Date.now()}_${originalname}`;
    this.logger.log(`Uploading file: ${objectName} to bucket: ${bucketName}`);

    await this.minioClient.putObject(
      bucketName,
      objectName,
      file.buffer,
      file.size,
      {
        'Content-Type': file.mimetype,
      },
    );

    return {
      bucketName,
      objectName,
    };
  }

  async getObject(objectName: string) {
    const bucketName = this.configService.get('minio.bucket');
    const dataStream = await this.minioClient.getObject(bucketName, objectName);
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      dataStream.on('data', (chunk) => chunks.push(chunk));
      dataStream.on('end', () => resolve(Buffer.concat(chunks)));
      dataStream.on('error', (error) => reject(error));
    });
  }
}
