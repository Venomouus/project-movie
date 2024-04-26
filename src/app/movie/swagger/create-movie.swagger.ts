/* eslint-disable prettier/prettier */
import { OmitType } from "@nestjs/swagger";
import { MovieEntity } from "../entity/movie.entity";

export class CreateMovieSwagger extends OmitType(MovieEntity, ['deleteAt', 'updateAt']){}