import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherEntity } from './entities/weather.entity';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherEntity])],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
