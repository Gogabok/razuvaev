import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { S3Module } from './s3/s3.module';
import { S3Service } from './s3/s3.service'

const config = {
  envFilePath: '.env',
  isGlobal: true,
};

@Module({
  imports: [
    ConfigModule.forRoot(config),
    S3Module
  ],
  controllers: [
    AppController
  ],
  providers: [
    S3Service
  ],
})

export class AppModule {}
