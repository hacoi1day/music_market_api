import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MinioModule } from 'src/minio/minio.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MinioModule, ConfigModule, JwtModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
