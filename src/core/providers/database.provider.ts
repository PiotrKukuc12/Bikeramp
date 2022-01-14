import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import { Trip } from 'src/modules/trip/trip.entity';
dotenv.config();

export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: process.env['DB_HOST'],
        port: Number(process.env['DB_PORT']),
        username: process.env['DB_USER'],
        password: process.env['DB_PASSWORD'],
        database: process.env['DB_NAME'],
        entities: [Trip],
        synchronize: true,
      }),
  },
];
