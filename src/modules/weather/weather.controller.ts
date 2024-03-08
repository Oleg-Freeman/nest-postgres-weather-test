import { Controller, Get, Post, Body } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherDto } from './dto/weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  create(@Body() weatherDto: WeatherDto) {
    return this.weatherService.create(weatherDto);
  }

  @Get()
  findAll() {
    return this.weatherService.findAll();
  }
}
