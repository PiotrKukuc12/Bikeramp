import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.model';
import { TripProvider } from 'src/core/providers/trip.provider';
import { TripService } from '../trip/trip.service';
import { StatsController } from './stats.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [StatsController],
  providers: [...TripProvider, TripService],
})
export class StatsModule {}
