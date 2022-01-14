import { Controller, Get } from '@nestjs/common';
import { TripService } from '../trip/trip.service';
import { WeeklyStatsDTO } from './dto/stats.dto';

@Controller()
export class StatsController {
  constructor(private readonly tripService: TripService) {}

  @Get('weekly')
  getTripsByWeekly(): Promise<WeeklyStatsDTO> {
    return this.tripService.getWeeklyTrips();
  }
}
