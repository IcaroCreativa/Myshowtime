import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateConcertDto } from 'src/dto/create-concert.dto';
import { IConcert } from 'src/interface/concert.interface';
import { Model } from "mongoose";
import { UpdateConcertDto } from 'src/dto/update-concert.dto';

@Injectable()
export class ConcertService  {
    constructor(@InjectModel('Concert') private concertModel:Model<IConcert>) { }
    
    async createConcert(createConcertDto: CreateConcertDto): Promise<IConcert> {
    const newConcert = await new this.concertModel(createConcertDto);
    return newConcert.save();
    }


    async updateConcert(concertId: string, updateConcertDto: UpdateConcertDto): Promise<IConcert> {
        const existingConcert = await this.concertModel.findByIdAndUpdate(concertId, updateConcertDto, { new: true });   if (!existingConcert) {
        throw new NotFoundException(`Concert #${concertId} not found`);
        }
        return existingConcert;
    }

    async getAllConcerts(): Promise<IConcert[]> {
        const concertData = await this.concertModel.find();    if (!concertData || concertData.length == 0) {
        throw new NotFoundException('Concerts data not found!');
        }
        return concertData;
    }

    async getConcert(concertId: string): Promise<IConcert> {
        const existingConcert = await     this.concertModel.findById(concertId).exec();   if (!existingConcert) {
        throw new NotFoundException(`Concert #${concertId} not found`);
        }
        return existingConcert;
    }
    
    async deleteConcert(concertId: string): Promise<IConcert> {
        const deletedConcert = await this.concertModel.findByIdAndDelete(concertId);   if (!deletedConcert) {
        throw new NotFoundException(`Concert #${concertId} not found`);
        }
        return deletedConcert;
    }



    async findAllRockConcerts(filter:string): Promise<IConcert[]> {
        return this.concertModel.aggregate([
          {
            $match: {
              gender: { $regex: filter }
            }
          }
        ]);
      }


}