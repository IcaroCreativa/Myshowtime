import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ObjectId } from 'mongoose';

@Schema({timestamps: true })
export class Ticket{
    @Prop({ type: 'ObjectId', ref: 'User' })
    user_id: string; 
    @Prop({ type: 'ObjectId', ref: 'Band' })
    band_id: string;   
    @Prop({ type: 'ObjectId', ref: 'Concert' })
    concert_id: string;   

}
export const TicketSchema = SchemaFactory.createForClass(Ticket);