import { Injectable } from '@nestjs/common';

const EasyYandexS3 = require('easy-yandex-s3').default;
const fs = require('fs-extra');
const TelegramBot = require('node-telegram-bot-api');

const messageConverter = (m: string): string[] => { 
  const max_size = 4096;

  const amount_sliced = m.length / max_size;
  let start = 0;
  let end = max_size;
  let message;
  const messagesArray = [];
  for (let i = 0; i < amount_sliced; i++) {
    message = m.slice(start, end);
    messagesArray.push(message);
    start = start + max_size;
    end = end + max_size;
  }

  return messagesArray;
}

@Injectable()
export class S3Service {
  private readonly TelegramToken = process.env.TG_BOT_ID
  private readonly TelegramGroupID = -4008140725
  private readonly bot = new TelegramBot(
    this.TelegramToken,
    { pooling: true }
  )
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
      const _content = JSON.stringify(content);

      console.log(_content, content);

      await fs.remove(settingsPath);

      await fs.ensureDir('settings')

      await fs.writeFile(settingsPath, _content);

      messageConverter(_content).forEach(message => {
        this.bot.sendMessage(this.TelegramGroupID, message, { parse_mode: 'html' })
      });

      const file = await fs.readFile(settingsPath);
      
      const uploadStatus = await this.s3.Upload({
        buffer: file,
        name: settingsFilename
      }, '');

      return !!uploadStatus;
    } catch (error) {
      return false;
    }
  }
}