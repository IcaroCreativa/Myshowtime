import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateTicketDto } from 'src/dto/create-ticket.dto';
import { UpdateTicketDto } from 'src/dto/update-ticket.dto';
import { TicketService } from 'src/service/ticket/ticket.service';

@Controller('ticket')
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

@Post()
    async createTicket(@Res() response, @Body() createTicketDto: 
CreateTicketDto) {
    try {
        const newTicket = await this.ticketService.createTicket(createTicketDto);    
        return response.status(HttpStatus.CREATED).json({
    message: 'Ticket has been created successfully',
    newTicket,});
} catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Ticket not created!',
    error: 'Bad Request'
});
}

}

@Put('/:id')
async updateTicket(@Res() response,@Param('id') ticketId: string,
@Body() updateTicketDto: UpdateTicketDto) {
    try {
    const existingTicket = await this.ticketService.updateTicket(ticketId, updateTicketDto);  return response.status(HttpStatus.OK).json({
    message: 'Ticket has been successfully updated',
    existingTicket,}); } catch (err) {
    return response.status(err.status).json(err.response);
    }
}

@Get()
async getTickets(@Res() response) {
try {
    const ticketData = await this.ticketService.getAllTickets();
    return response.status(HttpStatus.OK).json({
    message: 'All tickets data found successfully',ticketData,});
} catch (err) {
    return response.status(err.status).json(err.response);
    }
}

@Get('/:id')
async getTicket(@Res() response, @Param('id') ticketId: string) {
    try {
    const existingTicket = await
    this.ticketService.getTicket(ticketId);    return response.status(HttpStatus.OK).json({
    message: 'Ticket found successfully',existingTicket,});
    } catch (err) {
    return response.status(err.status).json(err.response);
    }
}

@Delete('/:id')
async deleteTicket(@Res() response, @Param('id') ticketId: string) {
    try {
    const deletedTicket = await this.ticketService.deleteTicket(ticketId);    return response.status(HttpStatus.OK).json({
    message: 'Ticket deleted successfully',
    deletedTicket,});
    }catch (err) {
    return response.status(err.status).json(err.response);
    }
}

}
