import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema({timestamps: true })
export class Concert{
    @Prop()
    band_name: string;
    @Prop()
    gender: string; 
    @Prop()
    date: Date;   
    @Prop()
    hour: number;   
    @Prop()
    location: string;   
    @Prop()
    price: number;
    @Prop()
    image: string;                              
    @Prop()
    number_of_seats: number;    
    @Prop()
    number_of_seats_sold: number;  

}
export const ConcertSchema = SchemaFactory.createForClass(Concert);