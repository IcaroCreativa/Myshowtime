import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTicketDto } from 'src/dto/create-ticket.dto';
import { ITicket } from 'src/interface/ticket.interface';
import { Model } from "mongoose";
import { UpdateTicketDto } from 'src/dto/update-ticket.dto';

@Injectable()
export class TicketService  {
    constructor(@InjectModel('Ticket') private ticketModel:Model<ITicket>) { }
    
    async createTicket(createTicketDto: CreateTicketDto): Promise<ITicket> {
    const newTicket = await new this.ticketModel(createTicketDto);
    return newTicket.save();
    }


    async updateTicket(ticketId: string, updateTicketDto: UpdateTicketDto): Promise<ITicket> {
        const existingTicket = await this.ticketModel.findByIdAndUpdate(ticketId, updateTicketDto, { new: true });   if (!existingTicket) {
        throw new NotFoundException(`Ticket #${ticketId} not found`);
        }
        return existingTicket;
    }

    async getAllTickets(): Promise<ITicket[]> {
        const ticketData = await this.ticketModel.find();    if (!ticketData || ticketData.length == 0) {
        throw new NotFoundException('Tickets data not found!');
        }
        return ticketData;
    }

    async getTicket(ticketId: string): Promise<ITicket> {
        const existingTicket = await this.ticketModel.findById(ticketId).exec();   if (!existingTicket) {
        throw new NotFoundException(`Ticket #${ticketId} not found`);
        }
        return existingTicket;
    }
    
    async deleteTicket(ticketId: string): Promise<ITicket> {
        const deletedTicket = await this.ticketModel.findByIdAndDelete(ticketId);   if (!deletedTicket) {
        throw new NotFoundException(`Ticket #${ticketId} not found`);
        }
        return deletedTicket;
    }


}