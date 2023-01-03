import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  Render,
  Request,Query
} from '@nestjs/common';

import { CreateConcertDto } from 'src/dto/create-concert.dto';
import { UpdateConcertDto } from 'src/dto/update-concert.dto';
import { ConcertService } from 'src/service/concert/concert.service';
import { JwtAuthGuard } from '../../auth/auth/jwt-auth.guard';
import { LocalAuthGuard } from '../../auth/local-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthService } from '../../auth/auth/auth.service'

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService, private authService: AuthService) {}
 
  @Post()
  async createConcert(
    @Res() response,
    @Body() createConcertDto: CreateConcertDto,
  ) {
    try {
      const newConcert = await this.concertService.createConcert(
        createConcertDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Concert has been created successfully',
        newConcert,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Concert not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateConcert(
    @Res() response,
    @Param('id') concertId: string,
    @Body() updateConcertDto: UpdateConcertDto,
  ) {
    try {
      const existingConcert = await this.concertService.updateConcert(
        concertId,
        updateConcertDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Concert has been successfully updated',
        existingConcert,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getConcerts(@Res() response) {
    try {
      const concertData = await this.concertService.getAllConcerts();
      return response.status(HttpStatus.OK).json({
        message: 'All concerts data found successfully',
        concertData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getConcert(@Res() response, @Param('id') concertId: string) {
    try {
      const existingConcert = await this.concertService.getConcert(concertId);
      return response.status(HttpStatus.OK).json({
        message: 'Concert found successfully',
        existingConcert,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteConcert(@Res() response, @Param('id') concertId: string) {
    try {
      const deletedConcert = await this.concertService.deleteConcert(concertId);
      return response.status(HttpStatus.OK).json({
        message: 'Concert deleted successfully',
        deletedConcert,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }


    
  
  }



  

