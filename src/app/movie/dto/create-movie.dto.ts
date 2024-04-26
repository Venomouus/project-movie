/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @ApiProperty()
  movieName: string;

  @IsNotEmpty()
  @ApiProperty()
  genre: string;

  @IsNotEmpty()
  @ApiPropertyOptional()
  score: string;
}
