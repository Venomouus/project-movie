/* eslint-disable prettier/prettier */
import { OmitType } from "@nestjs/swagger";
import { MovieEntity } from "../entity/movie.entity";

export class UpdateMovieSwagger extends OmitType(MovieEntity, ['createdAt', 'deleteAt', ]) {}