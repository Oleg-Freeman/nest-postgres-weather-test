import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class WeatherDto {
  @ApiProperty({ example: 49.8328, description: 'Latitude' })
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @ApiProperty({ example: 23.9297, description: 'Longitude' })
  @IsNumber()
  @IsNotEmpty()
  lon: number;

  @ApiProperty({
    example: 'hourly,daily',
    description: 'Used to exclude data from response',
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  part?: string;
}
