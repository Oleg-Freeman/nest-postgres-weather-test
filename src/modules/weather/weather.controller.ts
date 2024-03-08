import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WeatherEntity } from './entities/weather.entity';
import { WeatherService } from './weather.service';
import { WeatherDto } from './dto/weather.dto';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  @ApiOperation({ summary: 'Create weather record in DB' })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Weather record created successfully',
    type: WeatherEntity,
  })
  async create(@Body() weatherDto: WeatherDto) {
    return this.weatherService.create(weatherDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get weather records from DB' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of weather records',
    type: [WeatherEntity],
  })
  async findAll(@Query() weatherDto: WeatherDto) {
    return this.weatherService.findAll(weatherDto);
  }
}
