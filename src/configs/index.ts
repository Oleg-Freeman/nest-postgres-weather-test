import {
  HttpException,
  HttpStatus,
  ValidationPipeOptions,
} from '@nestjs/common';
import * as dotenv from 'dotenv';

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

  // getJwtSecret(): string {
  //   return this.getValue('JWT_SECRET');
  // }
  //
  // getJwtExpiresIn(): string {
  //   return this.getValue('JWT_EXPIRES_IN');
  // }
}

const configService = new ConfigService(process.env);

export { configService };