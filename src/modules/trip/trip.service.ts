import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { InsertResult, Repository } from 'typeorm';
import { Trip } from './trip.entity';
import * as dotenv from 'dotenv';
import { MothlyStatsDTO, WeeklyStatsDTO } from '../stats/dto/stats.dto';
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
      date: new Date(trip.date),
      distance: distanceInKm,
    };
    return this.tripRepository.insert(newTrip);
  }

  async getWeeklyTrips(): Promise<WeeklyStatsDTO> {
    const trips = await this.tripRepository.find();
    // startDate =  monday of the current week
    // endDate = sunday of the current week
    const startDate = new Date();
    const days = (startDate.getDay() + 7 - 1) % 7;
    startDate.setDate(startDate.getDate() - days);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    let sum_distane = 0;
    let sum_price = 0;

    const tripsInPeriod = trips.filter((trip) => {
      // lane below is to delete
      const tripDate = new Date(trip.date);
      return tripDate >= startDate && tripDate <= endDate;
    });

    tripsInPeriod.forEach((trip) => {
      // convert distance from string to int
      sum_distane += Number(trip.distance);
      sum_price += trip.price;
    });

    return {
      total_distance: sum_distane + 'km',
      total_price: sum_price + 'PLN',
    };
  }

  async getMonthlyTrips(): Promise<MothlyStatsDTO[]> {
    const trips = await this.tripRepository.find();
    const endDate = new Date();
    const result = [];

    const tripsInPeriod = trips.filter((trip) => {
      // lane below is to delete
      const tripDate = new Date(trip.date);
      return (
        tripDate.getFullYear() === endDate.getFullYear() &&
        tripDate.getMonth() === endDate.getMonth()
      );
    });
    // for each day in the month calculate the average distance and price
    for (let i = 0; i < endDate.getDate(); i++) {
      const day = new Date();
      day.setDate(i + 1);
      const dayTrips = tripsInPeriod.filter((trip) => {
        const tripDate = new Date(trip.date);
        return tripDate.getDate() === day.getDate();
      });
      const sum_distane = dayTrips.reduce((acc, trip) => {
        return acc + Number(trip.distance);
      }, 0);
      const sum_price = dayTrips.reduce((acc, trip) => {
        return acc + trip.price;
      }, 0);
      const avg_distane = Math.round((sum_distane / dayTrips.length) * 10) / 10;
      const avg_price = Math.round((sum_price / dayTrips.length) * 10) / 10;
      // if the day has not trips, skip it
      if (sum_distane !== 0 && sum_price !== NaN && avg_price !== NaN) {
        result.push({
          day: day.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
          total_distance: sum_distane + 'km',
          avg_ride: avg_distane + 'km',
          avg_price: avg_price + 'PLN',
        });
      }
    }
    return result;
  }
}
