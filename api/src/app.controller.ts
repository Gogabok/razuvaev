import { Controller, Put, Body } from '@nestjs/common';
import { S3Service } from './s3/s3.service';

@Controller('')
export class AppController {
  constructor(
    private readonly s3Service: S3Service
  ) {};

  @Put('/update') 
  async UploadSettings(@Body() body) {
    const status = await this.s3Service.UploadSettings(body);
    return status;
  }
}