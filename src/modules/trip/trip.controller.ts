import { Body, Controller, Post } from '@nestjs/common';
import { InsertResult } from 'typeorm';
import { Trip } from './trip.entity';
import { TripService } from './trip.service';

@Controller()
export class TripController {
  constructor(private tripService: TripService) {}

  @Post()
  createNewTrip(@Body() trip: Trip): Promise<InsertResult> {
    return this.tripService.createNewTrip(trip);
  }
}
