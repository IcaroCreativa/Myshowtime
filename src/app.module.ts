import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controller/user/user.controller';
import { UserSchema } from './schema/user.schema';
import { UserService } from './service/user/user.service';
import { ConcertSchema } from './schema/concert.schema';
import { ConcertService } from './service/concert/concert.service';
import { ConcertController } from './controller/concert/concert.controller';
import { LoginController } from './controller/login/login.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './service/user.module';
import { BandController } from './controller/band/band.controller';
import { BandSchema } from './schema/band.schema';
import { BandService } from './service/band/band.service';
import { TicketSchema } from './schema/ticket.schema';
import { TicketService } from './service/ticket/ticket.service';
import { TicketController } from './controller/ticket/ticket.controller';

@Module({
  imports:[MongooseModule.forRoot('mongodb+srv://Pedro:******@cluster0.lrhozex.mongodb.net/test?retryWrites=true&w=majority',{dbName: 'MyShowTime'}),
MongooseModule.forFeature([{ name: 'User', schema: UserSchema },{ name: 'Concert', schema: ConcertSchema },{ name: 'Ticket', schema: TicketSchema },{ name: 'Band', schema: BandSchema },]),
AuthModule,
],  
  controllers: [AppController,UserController,ConcertController,LoginController,BandController,TicketController],
  providers: [AppService,UserService,ConcertService,BandService,TicketService],
})



export class AppModule {}
