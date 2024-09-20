import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Url } from './url.schema';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}
  @Get(':shortened')
  async find(@Param('shortened') shortened: string, @Res() res) {
    const url = await this.urlService.findOne(shortened);
    res.redirect(url.original);
  }

  @Post()
  create(@Body() payload): Promise<Url> {
    return this.urlService.create(payload.original);
  }
}
