import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateBandDto } from 'src/dto/create-band.dto';
import { UpdateBandDto } from 'src/dto/update-band.dto';
import { BandService } from 'src/service/band/band.service';

@Controller('band')
export class BandController {
    constructor(private readonly bandService: BandService) { }

@Post()
    async createBand(@Res() response, @Body() createBandDto: 
CreateBandDto) {
    try {
        const newBand = await this.bandService.createBand(createBandDto);    
        return response.status(HttpStatus.CREATED).json({
    message: 'Band has been created successfully',
    newBand,});
} catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Band not created!',
    error: 'Bad Request'
});
}

}

@Put('/:id')
async updateBand(@Res() response,@Param('id') bandId: string,
@Body() updateBandDto: UpdateBandDto) {
    try {
    const existingBand = await this.bandService.updateBand(bandId, updateBandDto);  return response.status(HttpStatus.OK).json({
    message: 'Band has been successfully updated',
    existingBand,}); } catch (err) {
    return response.status(err.status).json(err.response);
    }
}

@Get()
async getBands(@Res() response) {
try {
    const bandData = await this.bandService.getAllBands();
    return response.status(HttpStatus.OK).json({
    message: 'All bands data found successfully',bandData,});
} catch (err) {
    return response.status(err.status).json(err.response);
    }
}

@Get(':bandName')
async getBandName(@Param('bandName') bandName: string) {
  return await this.bandService.findOneByName(bandName);
}



@Get('/:id')
async getBand(@Res() response, @Param('id') bandId: string) {
    try {
    const existingBand = await
    this.bandService.getBand(bandId);    return response.status(HttpStatus.OK).json({
    message: 'Band found successfully',existingBand,});
    } catch (err) {
    return response.status(err.status).json(err.response);
    }
}

@Delete('/:id')
async deleteBand(@Res() response, @Param('id') bandId: string) {
    try {
    const deletedBand = await this.bandService.deleteBand(bandId);    return response.status(HttpStatus.OK).json({
    message: 'Band deleted successfully',
    deletedBand,});
    }catch (err) {
    return response.status(err.status).json(err.response);
    }
}

}

