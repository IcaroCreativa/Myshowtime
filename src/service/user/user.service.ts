import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { IUser } from 'src/interface/user.interface';
import { Model } from "mongoose";
import { UpdateUserDto } from 'src/dto/update-user.dto';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
    
    constructor(@InjectModel('User') private userModel:Model<IUser>) { }

   

async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password,10);
    const { isadmin } = createUserDto;
    const hashisadmin= await bcrypt.hash(isadmin,10);
    // const newUser = await new this.userModel(createUserDto);
    // return newUser.save();
    const newUser = await new this.userModel({ ...createUserDto, password: hashedPassword, isadmin: hashisadmin });
    return newUser.save();
}


async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUser|object> {
    
    const { password } = updateUserDto;
    const { isadmin } = updateUserDto;

    // const hashedPassword = await bcrypt.hash(password,10);
    // const hashisadmin= await bcrypt.hash(isadmin,10);
    if(password && isadmin){
        const hashedPassword = await bcrypt.hash(password,10);
        const hashisadmin= await bcrypt.hash(isadmin,10);
        const existingUser = await this.userModel.findByIdAndUpdate(userId, {...updateUserDto,password: hashedPassword, isadmin: hashisadmin}, { new: true });   if (!existingUser) {
        throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;}

    else if(isadmin){
        const hashisadmin= await bcrypt.hash(isadmin,10);
        const existingUser = await this.userModel.findByIdAndUpdate(userId, {...updateUserDto,isadmin: hashisadmin}, { new: true });   if (!existingUser) {
        throw new NotFoundException(`User #${userId} not found`);
        }
        return existingUser;
    }
    else if(password){
        const hashedPassword = await bcrypt.hash(password,10);
        const existingUser = await this.userModel.findByIdAndUpdate(userId, {...updateUserDto,password: hashedPassword}, { new: true });   if (!existingUser) {
        throw new NotFoundException(`User #${userId} not found`);
        }
        return existingUser;
    }
    else{
    const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });   if (!existingUser) {
        throw new NotFoundException(`User #${userId} not found`);
        }
        return existingUser;}
}


async getAllUsers(): Promise<IUser[]> {
    const userData = await this.userModel.find();    if (!userData || userData.length == 0) {
    throw new NotFoundException('Users data not found!');
    }
    return userData;
}
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

async findOne(email: string): Promise<IUser|null|boolean> {
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (!existingUser) {
      return false;
    }
  
    return true;
  }


async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);  if (!deletedUser) {
    throw new NotFoundException(`User #${userId} not found`);
    }
    return deletedUser;
}

async removeFromFavorites(userId: string, favoriteId: string): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { $pull: { favorites: favoriteId } }).exec();
  }


async addToFavorites(userId: string, favoriteId: string): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { $addToSet: { favorites: favoriteId } }).exec();
  }  

}

