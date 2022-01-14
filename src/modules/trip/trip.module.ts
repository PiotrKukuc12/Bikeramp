import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.model';
import { TripProvider } from 'src/core/providers/trip.provider';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TripController],
  providers: [...TripProvider, TripService],
})
export class TripModule {}
