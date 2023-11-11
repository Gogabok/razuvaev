import { Injectable } from '@nestjs/common';

const EasyYandexS3 = require('easy-yandex-s3').default;
const fs = require('fs-extra');
const path = require('path');

@Injectable()
export class S3Service {
  private readonly s3 = new EasyYandexS3({
    auth: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    Bucket: process.env.S3_BUCKET
  })

  constructor() { }


  async UploadSettings(content: Record<string, string>) {
    try {
      const settingsFilename = 'settings.json';
      const settingsPath = `settings/${settingsFilename}`;

      await fs.remove(settingsPath);

      await fs.ensureDir('settings')

      await fs.writeFile(settingsPath, JSON.stringify(content));

      const file = await fs.readFile(settingsPath);
      
      const uploadStatus = await this.s3.Upload({
        buffer: file,
        name: settingsFilename
      }, '')

      return !!uploadStatus;
    } catch (error) {
      return false;
    }
  }
}