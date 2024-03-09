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

  async create({ lat, lon, part }: WeatherDto) {
    const data = await this.fetchOpenWeather({ lat, lon, part });

    return this.weatherRepository.save(
      this.weatherRepository.create({ lat, lon, data }),
    );
  }

  async findAll({ lat, lon }: WeatherDto) {
    return this.weatherRepository
      .createQueryBuilder('w')
      .select()
      .where('w.lat = :lat', { lat })
      .andWhere('w.lon = :lon', { lon })
      .getMany();
  }

  async fetchOpenWeather({
    lat = 90,
    lon = 90,
    part,
  }: {
    lat: number;
    lon: number;
    part: string;
  }) {
    const params: {
      lat: number;
      lon: number;
      appid: string;
      exclude?: string;
    } = {
      lat,
      lon,
      appid: configService.getOpenWeatherApiKey(),
    };

    if (part) {
      params.exclude = part;
    }

    try {
      const response = this.httpService.get(
        configService.getOpenWeatherApiUrl(),
        {
          params,
        },
      );
      const { data } = await lastValueFrom(response);

      return data || {};
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
