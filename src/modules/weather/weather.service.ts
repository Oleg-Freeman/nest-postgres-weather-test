import { Injectable } from '@nestjs/common';
import { WeatherDto } from './dto/weather.dto';

@Injectable()
export class WeatherService {
  create(createWeatherDto: WeatherDto) {
    return 'This action adds a new weather';
  }

  findAll() {
    return `This action returns all weather`;
  }
}
