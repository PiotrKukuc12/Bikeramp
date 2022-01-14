import { Transform } from 'class-transformer';
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

  @Column({ type: 'numeric', precision: 10, scale: 1, nullable: true })
  distance?: number;

  @Transform(() => Date, { toPlainOnly: true })
  @Column('text')
  date: Date;
}
