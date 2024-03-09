import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { WeatherEntity } from './entities/weather.entity';
import { WeatherService } from './weather.service';
import * as testData from './testData/data.json';

describe('WeatherService', () => {
  let service: WeatherService;
  const mockWeatherRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      data: dto.data,
      lat: dto.lat,
      lon: dto.lon,
    })),
    save: jest.fn().mockImplementation((dto) => dto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: getRepositoryToken(WeatherEntity),
          useValue: mockWeatherRepository,
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockImplementation(
              () =>
                new Observable((subscriber) => {
                  subscriber.next({ data: testData });
                  subscriber.complete();
                }),
            ),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get open weather data', async () => {
    const data = await service.fetchOpenWeather({
      lat: 90,
      lon: 90,
      part: 'current',
    });

    expect(data).toBeDefined();
  });

  it('should create weather record', async () => {
    const data = await service.create({
      lat: 90,
      lon: 90,
      part: 'current',
    });

    expect(data).toBeDefined();
    expect(mockWeatherRepository.create).toBeCalled();
    expect(mockWeatherRepository.save).toBeCalled();
  });
});
