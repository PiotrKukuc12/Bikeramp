import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TripModule } from 'src/modules/trip/trip.module';

@Module({
  imports: [
    TripModule,
    RouterModule.register([
      {
        path: 'api/trips',
        module: TripModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
