import { IsBoolean, IsDate, isInt, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";export class CreateConcertDto {
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    readonly band_name: string;   

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    readonly gender: string;   
    

    @IsNotEmpty()
    @IsISO8601()
    readonly date: number;
    
    @IsNumber()
    @IsOptional()
    readonly hour: number;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    readonly location: string;
    
    @IsString()
    @IsOptional()
    readonly image: string;
    
    
    @IsNumber()
    @IsOptional()
    readonly price: number;
    
  
    @IsNumber()
    @IsOptional()
    readonly number_of_seats: number;

   
    @IsNumber()
    @IsOptional()
    readonly number_of_seats_sold: number;
    
      
}


  
