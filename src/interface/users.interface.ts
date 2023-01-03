import { Document } from 'mongoose';
export interface IUsers extends Document{
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly isadmin: boolean;
    readonly favorites: string[];
}