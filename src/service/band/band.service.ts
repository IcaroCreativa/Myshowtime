import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBandDto } from 'src/dto/create-band.dto';
import { IBand } from 'src/interface/band.interface';
import { Model } from "mongoose";
import { UpdateBandDto } from 'src/dto/update-band.dto';

@Injectable()
export class BandService {constructor(@InjectModel('Band') private bandModel:Model<IBand>) { }

async createBand(createBandDto: CreateBandDto): Promise<IBand> {
    const newBand = await new this.bandModel(createBandDto);
    return newBand.save();
}
async updateBand(bandId: string, updateBandDto: UpdateBandDto): Promise<IBand> {
    const existingBand = await        this.bandModel.findByIdAndUpdate(bandId, updateBandDto, { new: true });   if (!existingBand) {
    throw new NotFoundException(`Band #${bandId} not found`);
    }
    return existingBand;
}
async getAllBands(): Promise<IBand[]> {
    const bandData = await this.bandModel.find();    if (!bandData || bandData.length == 0) {
    throw new NotFoundException('Bands data not found!');
    }
    return bandData;
}
async getBand(bandId: string): Promise<IBand> {
    const existingBand = await     this.bandModel.findById(bandId).exec();   if (!existingBand) {
    throw new NotFoundException(`Band #${bandId} not found`);
    }
    return existingBand;
}


  async findOneByName(bandName: string): Promise<any> {
    return await this.bandModel.findOne({ name: { $regex: new RegExp(`^${bandName}$`, 'i') } }).exec();
  }


async deleteBand(bandId: string): Promise<IBand> {
    const deletedBand = await this.bandModel.findByIdAndDelete(bandId);   if (!deletedBand) {
    throw new NotFoundException(`Band #${bandId} not found`);
    }
    return deletedBand;
}
}
