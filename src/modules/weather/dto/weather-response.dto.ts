import { ApiProperty } from '@nestjs/swagger';

export class WeatherResponseDto {
  @ApiProperty({ example: 1684926645, description: 'Sunrise' })
  sunrise: number;

  @ApiProperty({ example: 1684977332, description: 'Sunset' })
  sunset: number;

  @ApiProperty({ example: 292.55, description: 'Temperature' })
  tem: number;

  @ApiProperty({ example: 292.87, description: 'Feels like' })
  feels_like: number;

  @ApiProperty({ example: 1014, description: 'Pressure' })
  pressure: number;

  @ApiProperty({ example: 89, description: 'Humidity' })
  humidity: number;

  @ApiProperty({ example: 0.16, description: 'UV index' })
  uvi: number;

  @ApiProperty({ example: 3.13, description: 'Wind speed' })
  wind_speed: number;
}
