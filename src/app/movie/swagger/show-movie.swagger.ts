/* eslint-disable prettier/prettier */
import { OmitType } from "@nestjs/swagger";
import { MovieEntity } from "../entity/movie.entity";

export class ShowMovieSwagger extends OmitType(MovieEntity, ['createdAt', 'deleteAt', 'updateAt']) {}