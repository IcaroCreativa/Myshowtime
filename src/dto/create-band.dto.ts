import { IsArray, IsISO8601, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateBandDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;    
    
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly genre: string;
    
    @IsArray()
    @IsOptional()
    public concert_dates: Date[];  

    // @IsArray()
    // @IsOptional()
    // dates: string[];
      
}