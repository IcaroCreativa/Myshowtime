import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;    
    
    @IsString()
    @IsNotEmpty()
    readonly email: string;
    
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsArray()
    @IsOptional()
    readonly favorites: string[];

    
    @IsString()
    @IsNotEmpty()
    readonly isadmin: string;    
}