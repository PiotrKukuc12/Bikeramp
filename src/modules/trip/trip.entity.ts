import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    default: 'Janowska 72, 21-500 Biała Podlaska',
  })
  @Column()
  start_address: string;

  @ApiProperty({
    default: 'Łukaszyńska 39,21-500 Biała Podlaska',
  })
  @Column()
  end_address: string;

  @ApiProperty({
    default: 12,
  })
  @Column()
  price: number;

  @Column({ type: 'numeric', precision: 10, scale: 1, nullable: true })
  distance?: number;

  @ApiProperty()
  @Transform(() => Date, { toPlainOnly: true })
  @Column('text')
  date: Date;
}
