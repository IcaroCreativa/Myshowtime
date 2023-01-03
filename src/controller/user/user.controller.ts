import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { UserService } from 'src/service/user/user.service';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

@Post()
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
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

@Put('/:id')
async updateUser(@Res() response,@Param('id') userId: string,
@Body() updateUserDto: UpdateUserDto) {
    try {
        // const { password } = updateUserDto;
        // const hashedPassword = await bcrypt.hash(password,10);
        // const { isadmin } = updateUserDto;
        // const hashisadmin= await bcrypt.hash(isadmin,10);
        // const updatedUserDto = { ...updateUserDto, password: hashedPassword, isadmin: hashisadmin };
    const existingUser = await this.userService.updateUser(userId, updateUserDto);  return response.status(HttpStatus.OK).json({
    message: 'User has been successfully updated',
    existingUser,}); } catch (err) {
    return response.status(err.status).json(err.response);
    }
}

@Get()
async getUsers(@Res() response) {
try {
    const userData = await this.userService.getAllUsers();
    return response.status(HttpStatus.OK).json({
    message: 'All users data found successfully',userData,});
} catch (err) {
    return response.status(err.status).json(err.response);
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

@Delete('/:id')
async deleteUser(@Res() response, @Param('id') userId: string) {
    try {
    const deletedUser = await this.userService.deleteUser(userId);    return response.status(HttpStatus.OK).json({
    message: 'User deleted successfully',
    deletedUser,});
    }catch (err) {
    return response.status(err.status).json(err.response);
    }
}

@Delete(':userId/favorites/:favoriteId')
async removeFromFavorites(@Res() response, @Param('userId') userId: string, @Param('favoriteId') favoriteId: string): Promise<void> {
  try {
    await this.userService.removeFromFavorites(userId, favoriteId);
    return response.status(HttpStatus.OK).json({
      message: 'Favorite removed successfully',
    });
  } catch (err) {
    return response.status(err.status).json(err.response);
  }
}

@Put(':userId/favorites/:favoriteId')
async addToFavorites(@Res() response, @Param('userId') userId: string, @Param('favoriteId') favoriteId: string): Promise<void> {
  try {
    await this.userService.addToFavorites(userId, favoriteId);
    return response.status(HttpStatus.OK).json({
      message: 'Favorite saved successfully',
    });
  } catch (err) {
    return response.status(err.status).json(err.response);
  }
}


}
