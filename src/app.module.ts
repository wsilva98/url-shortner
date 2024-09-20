import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './url/url.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), UrlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
