import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './configs';
import { WeatherModule } from './modules/weather/weather.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...configService.getDbConfig(),
    }),
    WeatherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
