import { Controller, Get, Query, Put, Body } from '@nestjs/common';
import { S3Service } from './s3/s3.service';

@Controller('')
export class AppController {
  private readonly authToken = process.env.ADMIN_TOKEN;

  constructor(
    private readonly s3Service: S3Service
  ) {};

  @Get('/token')
  async CheckTokenValidation(@Query() params) {
    return { isTokenValid: this.authToken === params.token };
  };

  @Put('/update') 
  async UploadSettings(@Query() params, @Body() body) {
    if(params.token !== this.authToken) {
      return false;
    }

    const status = await this.s3Service.UploadSettings(body);
    return status;
  }
}