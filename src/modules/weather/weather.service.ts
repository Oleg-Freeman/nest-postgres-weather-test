import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherDto } from './dto/weather.dto';
import { WeatherEntity } from './entities/weather.entity';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>,
  ) {}

  async create({ lat, lon }: WeatherDto) {
    // const weather = await this.fetchOpenWeather({ lat, lon });

    return this.weatherRepository.save(
      this.weatherRepository.create({ lat, lon, data: {} }),
    );
  }

  async findAll({ lat, lon }: WeatherDto) {
    return this.weatherRepository.find({ where: { lat, lon } });
  }
}
