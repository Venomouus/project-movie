import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entity/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
