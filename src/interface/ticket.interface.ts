import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

export interface ITicket extends Document{
    readonly user_id: ObjectId; 
    readonly band_id: ObjectId; 
    readonly concert_id: ObjectId; 
}