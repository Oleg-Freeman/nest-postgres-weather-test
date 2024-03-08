import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'weather' })
export class WeatherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', nullable: false })
  lat: number;

  @Column({ type: 'float', nullable: false })
  lon: number;

  @Column({ type: 'jsonb', nullable: false, default: {} })
  data: {
    [key: string]: unknown;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
