import { Provider } from '@nestjs/common';
import { Trip } from 'src/modules/trip/trip.entity';
import { Connection } from 'typeorm';

export const TripProvider: Provider[] = [
  {
    provide: 'TRIP_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Trip),
    inject: ['DATABASE_CONNECTION'],
  },
];
