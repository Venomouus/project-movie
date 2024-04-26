/* eslint-disable prettier/prettier */

import { OmitType } from "@nestjs/swagger";
import { UserEntity } from "../entity/user.entity";


export class CreateUserSwagger extends OmitType(UserEntity, ['deleteAt', 'updateAt']){}