import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from '../controller/user/user.controller';
import { UserSchema } from '../schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forRoot('mongodb+srv://Nayel:*-Mongodb-*@cluster0.lrhozex.mongodb.net/test?retryWrites=true&w=majority',{dbName: 'MyShowTime'}),
  MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
  
})
export class UserModule {}


