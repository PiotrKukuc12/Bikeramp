import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_address: string;

  @Column()
  end_address: string;

  @Column()
  price: number;

  @Column()
  distance: number;

  @Column()
  date: Date;
}
