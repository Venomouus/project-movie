/* eslint-disable prettier/prettier */

import { OmitType } from "@nestjs/swagger";
import { UserEntity } from "../entity/user.entity";


export class ShowUserSwagger extends OmitType(UserEntity, ['createdAt','deleteAt', 'updateAt']){}