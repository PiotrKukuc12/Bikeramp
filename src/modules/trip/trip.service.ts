import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { InsertResult, Repository } from 'typeorm';
import { Trip } from './trip.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class TripService {
  constructor(
    @Inject('TRIP_REPOSITORY')
    private tripRepository: Repository<Trip>,
  ) {}

  async createNewTrip(trip: Trip): Promise<InsertResult> {
    const params = {
      destination: trip.start_address,
      origin: trip.end_address,
      key: process.env['GOOGLE_MAPS_API_KEY'],
      mode: 'bicycling',
    };
    const queryString = new URLSearchParams(params).toString();
    const result = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?${queryString}`,
    );
    if (result.data.status !== 'OK') {
      throw new BadRequestException("Can't find the route");
    }

    const distance = result.data.routes[0].legs[0].distance.value;
    // convert distance from meters to kilometes
    const distanceInKm = Math.round((distance / 1000) * 10) / 10;

    const newTrip = {
      ...trip,
      distance: distanceInKm,
    };
    return this.tripRepository.insert(newTrip);
  }
}
