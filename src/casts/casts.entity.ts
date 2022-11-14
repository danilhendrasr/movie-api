import { Exclude } from 'class-transformer';
import { Factory } from 'nestjs-seeder';
import { MovieToCast } from 'src/movies-to-casts/movies-to-casts.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cast {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Factory((faker) => faker.name.fullName())
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Factory((faker) => faker.date.birthdate())
  @Column({ nullable: true, type: 'date' })
  birthday?: Date;

  @Factory((faker) => faker.date.future())
  @Column({ nullable: true })
  deathDay?: Date;

  @Factory(() => Math.floor(Math.random() * 5))
  @Column({ nullable: true })
  rating?: number;

  @Exclude()
  @OneToMany(() => MovieToCast, (movieToCast) => movieToCast.cast)
  movieToCasts?: MovieToCast[];
}
