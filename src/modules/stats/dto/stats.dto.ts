import { ApiProperty } from '@nestjs/swagger';

export class WeeklyStatsDTO {
  @ApiProperty()
  total_distance: string;
  @ApiProperty()
  total_price: string;
}

export class MothlyStatsDTO {
  @ApiProperty()
  day: string;
  @ApiProperty()
  total_distance: string;
  @ApiProperty()
  avg_ride: string;
  @ApiProperty()
  avg_price: string;
}
