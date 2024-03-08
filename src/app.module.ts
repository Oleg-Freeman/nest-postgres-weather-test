import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './configs';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...configService.getDbConfig(),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
