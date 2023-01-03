import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { UserService } from 'src/service/user/user.service';

@Controller('login')
export class LoginController {
    constructor(private readonly userService: UserService) { }


    @Get('/:email')
    async getUserByEmail(@Res() response, @Param('email') email: string) {
    
        try {
        const existingUser = await
        this.userService.getuseremail(email);    return response.status(HttpStatus.OK).json({
        message: 'User found successfully',existingUser,});
        } catch (err) {
        return response.status(err.status).json(err.response);
        }
    }

@Post()
    async createUser(@Res() response, @Body() createUserDto: 
CreateUserDto) {
    try {
        const newUser = await this.userService.createUser(createUserDto);    
        return response.status(HttpStatus.CREATED).json({
    message: 'User has been created successfully',
    newUser,});
} catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: User not created!',
    error: 'Bad Request'
});
}

}


@Get('/:id')
async getUser(@Res() response, @Param('id') userId: string) {
    try {
    const existingUser = await
    this.userService.getUser(userId);    return response.status(HttpStatus.OK).json({
    message: 'User found successfully',existingUser,});
    } catch (err) {
    return response.status(err.status).json(err.response);
    }
}


}