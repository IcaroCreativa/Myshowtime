import { Document } from 'mongoose';
export interface IConcert extends Document{
    readonly band_name: string;
    readonly date: Date;
    readonly hour: number;
    readonly location: string;
    readonly price: number; 
    readonly number_of_seats: number; 
    readonly number_of_seats_sold: number; 
}

