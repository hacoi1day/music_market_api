import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/Upload.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Upload')
@ApiBearerAuth()
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() _uploadFileDto: UploadFileDto,
  ) {
    return this.uploadService.upload(file);
  }

  @Get(':file')
  async get(@Param('file') file: string, @Res() res: Response) {
    const data = await this.uploadService.get(file);
    res.send(data);
  }
}
