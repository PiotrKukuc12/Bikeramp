import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { StatsModule } from 'src/modules/stats/stats.module';
import { TripModule } from 'src/modules/trip/trip.module';

@Module({
  imports: [
    TripModule,
    StatsModule,
    RouterModule.register([
      {
        path: 'api/trips',
        module: TripModule,
      },
      {
        path: 'api/stats',
        module: StatsModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
