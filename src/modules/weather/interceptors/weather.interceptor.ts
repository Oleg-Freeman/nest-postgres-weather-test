import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { WeatherEntity } from '../entities/weather.entity';

@Injectable()
export class WeatherInterceptor implements NestInterceptor {
  private extractWeatherData({ data }: WeatherEntity) {
    const {
      sunrise,
      sunset,
      temp,
      feels_like,
      pressure,
      humidity,
      uvi,
      wind_speed,
    } = data?.current;

    return {
      sunrise,
      sunset,
      temp,
      feels_like,
      pressure,
      humidity,
      uvi,
      wind_speed,
    };
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((weatherRecords: WeatherEntity | WeatherEntity[]) => {
        if (Array.isArray(weatherRecords)) {
          return weatherRecords.map((weather) =>
            this.extractWeatherData(weather),
          );
        }

        return this.extractWeatherData(weatherRecords);
      }),
    );
  }
}
