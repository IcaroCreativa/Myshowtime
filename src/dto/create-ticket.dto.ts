import { ObjectId } from 'mongoose';

import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";export class CreateTicketDto {   
    @IsNotEmpty()
    readonly user_id: ObjectId;    

    @IsNotEmpty()
    readonly band_id: ObjectId;

    @IsNotEmpty()
    readonly concert_id: ObjectId;
     
}