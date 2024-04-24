/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieEntity } from './entity/movie.entity';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieService {
    constructor(
    @InjectRepository(MovieEntity)
        private readonly MovieRepository: Repository<MovieEntity>,

    ) {}

    async findAll() {
        return await this.MovieRepository.find();
    }
    
    async findOneOrFail(id: string) {
        try {
          return await this.MovieRepository.findOneOrFail({ where: { id } });
        } catch (error) {
          throw new NotFoundException(error.message);
        }
      }

    async create(data) {
        return await this.MovieRepository.save(this.MovieRepository.create(data))
    }

    async update(id: string, data) {
        const movie = await this.findOneOrFail(id)

        this.MovieRepository.merge(movie, data)
        return await this.MovieRepository.save(movie)
    }

    async deleteById(id: string) {
        await this.findOneOrFail(id)
        await this.MovieRepository.softDelete(id)
    }
}
