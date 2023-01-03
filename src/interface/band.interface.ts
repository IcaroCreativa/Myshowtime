import { Document } from 'mongoose';
export interface IBand extends Document{
    readonly name: string;
    readonly genre: string;
    readonly concert_dates: Date[];  
}