import { Controller, Get } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { TripService } from '../trip/trip.service';
import { MothlyStatsDTO, WeeklyStatsDTO } from './dto/stats.dto';

@Controller()
export class StatsController {
  constructor(private readonly tripService: TripService) {}

  @ApiOkResponse({
    description: 'Returns Weekly stats',
    type: WeeklyStatsDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('weekly')
  getTripsByWeekly(): Promise<WeeklyStatsDTO> {
    return this.tripService.getWeeklyTrips();
  }

  @ApiOkResponse({
    description: 'Returns Monthly stats',
    type: MothlyStatsDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('monthly')
  getTripsByMonthly(): Promise<MothlyStatsDTO[]> {
    return this.tripService.getMonthlyTrips();
  }
}
