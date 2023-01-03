import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema( {timestamps: true})
export class Band{
   @Prop()
   name: string;   
   
   @Prop()
   genre: string;   
   
   @Prop()
   concert_dates: Date[]; 

   // @Prop()
   // dates: string[]; 
     
   
}export const BandSchema = SchemaFactory.createForClass(Band);
