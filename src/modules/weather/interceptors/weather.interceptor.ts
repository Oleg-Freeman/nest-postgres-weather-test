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
  private extractWeatherData(
    { data: { current = {} } }: WeatherEntity,
    part = '',
  ) {
    const {
      sunrise,
      sunset,
      temp,
      feels_like,
      pressure,
      humidity,
      uvi,
      wind_speed,
    } = current;

    const result = {
      sunrise,
      sunset,
      temp,
      feels_like,
      pressure,
      humidity,
      uvi,
      wind_speed,
    };

    if (part?.length > 0) {
      part.split(',').forEach((key) => {
        delete result[key];
      });
    }

    return result;
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { part } = req.query;

    return next.handle().pipe(
      map((weatherRecords: WeatherEntity | WeatherEntity[]) => {
        if (Array.isArray(weatherRecords)) {
          return weatherRecords.map((weather) =>
            this.extractWeatherData(weather, part),
          );
        }

        return this.extractWeatherData(weatherRecords, part);
      }),
    );
  }
}
