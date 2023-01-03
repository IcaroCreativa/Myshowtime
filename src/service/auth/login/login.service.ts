import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { IUser } from 'src/interface/user.interface';
import { Model } from "mongoose";




@Injectable()
export class LoginService {
    
    constructor(@InjectModel('User') private userModel:Model<IUser>) { }

async getUser(userId: string): Promise<IUser> {
    const existingUser = await     this.userModel.findById(userId).exec();   if (!existingUser) {
    throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
}
async getuseremail(email: string): Promise<IUser> {
    const existingUser = await     this.userModel.findOne({"email": email}).exec();   if (!existingUser) {
    throw new NotFoundException(`User #${email} not found`);
    }
    return existingUser;
}

}
