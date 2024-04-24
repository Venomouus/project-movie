/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  movieName: string;

  @Column()
  genre: string;

  @Column({width: 2})
  score: number;

  @CreateDateColumn({name: 'created_at'})
  createdAt: string;

  @UpdateDateColumn({name: 'updated_at'})
  updateAt: string;

  @DeleteDateColumn({name: 'deleted_at'})
  deleteAt: string;
}
