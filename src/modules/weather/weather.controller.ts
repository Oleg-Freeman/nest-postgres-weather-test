import {
  Controller,
  Get,
  Post,
  Query,
  HttpStatus,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiExtraModels,
} from '@nestjs/swagger';
import { WeatherResponseDto } from './dto/weather-response.dto';
import { WeatherEntity } from './entities/weather.entity';
import { WeatherInterceptor } from './interceptors/weather.interceptor';
import { WeatherService } from './weather.service';
import { WeatherDto } from './dto/weather.dto';

@ApiTags('Weather')
@ApiExtraModels(WeatherEntity)
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @UseInterceptors(WeatherInterceptor)
  @Post()
  @ApiOperation({ summary: 'Create weather record in DB' })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Weather record created successfully',
    type: WeatherResponseDto,
  })
  async create(@Query() weatherDto: WeatherDto) {
    return this.weatherService.create(weatherDto);
  }

  @UseInterceptors(WeatherInterceptor)
  @Get()
  @ApiOperation({ summary: 'Get weather records from DB' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of weather records',
    type: [WeatherResponseDto],
  })
  async findAll(@Query() weatherDto: WeatherDto) {
    return this.weatherService.findAll(weatherDto);
  }
}
