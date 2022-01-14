import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { InsertResult } from 'typeorm';
import { Trip } from './trip.entity';
import { TripService } from './trip.service';

@Controller()
export class TripController {
  constructor(private tripService: TripService) {}

  @ApiOkResponse({
    description: 'Returns Insert Result of trip',
    type: Trip,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post()
  createNewTrip(@Body() trip: Trip): Promise<InsertResult> {
    return this.tripService.createNewTrip(trip);
  }
}
