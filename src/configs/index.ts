import {
  HttpException,
  HttpStatus,
  ValidationPipeOptions,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new HttpException(
        `validation:error. config error - missing env.${key}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return value;
  }

  getPort(): number {
    return +this.getValue('PORT', false) || 3000;
  }

  getValidationOptions(transform: boolean = true): ValidationPipeOptions {
    const options: ValidationPipeOptions = {
      whitelist: true,
      forbidNonWhitelisted: true,
    };

    if (transform) {
      return {
        ...options,
        stopAtFirstError: false,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
          exposeDefaultValues: true,
        },
      };
    }

    return options;
  }

  getDbConfig(): DataSourceOptions {
    return {
      type: 'postgres',
      port: parseInt(this.getValue('POSTGRES_PORT')),
      host: this.getValue('POSTGRES_HOST') || 'localhost',
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DB'),
      entities: ['dist/modules/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*.js'],
      migrationsTableName: 'migrations_typeorm',
      migrationsRun: true,
      logging: true,
      synchronize: false,
    };
  }

  getOpenWeatherApiKey(): string {
    return this.getValue('OPEN_WEATHER_API_KEY');
  }

  getOpenWeatherApiUrl(): string {
    return this.getValue('OPEN_WEATHER_API_URL');
  }

  getSwaggerConfig() {
    return {
      customSiteTitle: 'Weather API',
      customfavIcon:
        'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
      ],
      customCssUrl: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
      ],
    };
  }
}

const configService = new ConfigService(process.env);

export { configService };
