import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherDto } from './dto/weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async create(@Body() weatherDto: WeatherDto) {
    return this.weatherService.create(weatherDto);
  }

  @Get()
  async findAll(@Query() weatherDto: WeatherDto) {
    return this.weatherService.findAll(weatherDto);
  }
}
