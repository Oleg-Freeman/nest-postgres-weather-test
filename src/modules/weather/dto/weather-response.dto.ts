import { ApiProperty } from '@nestjs/swagger';

export class WeatherResponseDto {
  @ApiProperty({
    example: 1684926645,
    description: 'Sunrise',
    nullable: true,
    required: false,
  })
  sunrise: number;

  @ApiProperty({
    example: 1684977332,
    description: 'Sunset',
    nullable: true,
    required: false,
  })
  sunset: number;

  @ApiProperty({
    example: 292.55,
    description: 'Temperature',
    nullable: true,
    required: false,
  })
  temp: number;

  @ApiProperty({
    example: 292.87,
    description: 'Feels like',
    nullable: true,
    required: false,
  })
  feels_like: number;

  @ApiProperty({
    example: 1014,
    description: 'Pressure',
    nullable: true,
    required: false,
  })
  pressure: number;

  @ApiProperty({
    example: 89,
    description: 'Humidity',
    nullable: true,
    required: false,
  })
  humidity: number;

  @ApiProperty({
    example: 0.16,
    description: 'UV index',
    nullable: true,
    required: false,
  })
  uvi: number;

  @ApiProperty({
    example: 3.13,
    description: 'Wind speed',
    nullable: true,
    required: false,
  })
  wind_speed: number;
}
