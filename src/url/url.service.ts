import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './url.schema';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private catModel: Model<Url>) {}

  async create(originalUrl: string): Promise<Url> {
    const urlDto: Url = {
      original: originalUrl,
      shortened: await this.generateRandomShortened(),
    };

    const createdCat = new this.catModel(urlDto);
    return createdCat.save();
  }

  async findOne(shortenedUrl): Promise<Url> {
    return this.catModel.findOne({
      shortened: shortenedUrl,
    });
  }

  private async generateRandomShortened(): Promise<string> {
    let shortUrl;
    let urlFound;

    do {
      const randomVal = this.generateRandomString(10);
      shortUrl = `${randomVal}`;
      urlFound = await this.catModel.find({ shortened: shortUrl });
    } while (urlFound && urlFound > 0);

    return shortUrl;
  }

  private generateRandomString(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
