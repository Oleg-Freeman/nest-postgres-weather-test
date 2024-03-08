import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'weather' })
export class WeatherEntity {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 55.7558, description: 'Latitude' })
  @Column({ type: 'float', nullable: false })
  lat: number;

  @ApiProperty({ example: 37.6176, description: 'Longitude' })
  @Column({ type: 'float', nullable: false })
  lon: number;

  @ApiProperty({ example: {}, description: 'Weather data' })
  @Column({ type: 'jsonb', nullable: false, default: {} })
  data: {
    [key: string]: unknown;
  };

  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: 'Created at',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: 'Updated at',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
