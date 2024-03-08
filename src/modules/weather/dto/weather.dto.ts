import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class WeatherDto {
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  lon: number;

  @IsString()
  @IsOptional()
  part?: string;
}
