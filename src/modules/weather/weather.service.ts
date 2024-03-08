import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { configService } from '../../configs';
import { WeatherDto } from './dto/weather.dto';
import { WeatherEntity } from './entities/weather.entity';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>,
    private readonly httpService: HttpService,
  ) {}

  async create({ lat, lon }: WeatherDto) {
    const data = await this.fetchOpenWeather({ lat, lon });

    // return this.weatherRepository.save(
    //   this.weatherRepository.create({ lat, lon, data }),
    // );
    return data;
  }

  async findAll({ lat, lon }: WeatherDto) {
    return this.weatherRepository.find({ where: { lat, lon } });
  }

  async fetchOpenWeather({ lat = 90, lon = 90 }: { lat: number; lon: number }) {
    try {
      const response = this.httpService.get(
        configService.getOpenWeatherApiUrl(),
        {
          params: {
            lat,
            lon,
            appid: configService.getOpenWeatherApiKey(),
          },
        },
      );
      const { data } = await lastValueFrom(response);

      return data || {};
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
