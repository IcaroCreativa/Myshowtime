import { Controller,Response, Req, Get, Request,Param, Render, Post, UseGuards, Res,HttpStatus,Headers } from '@nestjs/common';
import { JwtAuthGuard,AdminAuthGuard } from './auth/auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth/auth.service'
import { UserService } from 'src/service/user/user.service';
import { stringify } from 'querystring';
import { ConcertService } from './service/concert/concert.service';
import { BandService } from 'src/service/band/band.service';




@Controller()
export class AppController {
  constructor(private authService: AuthService, private userService:UserService, private concertService:ConcertService,private readonly bandService: BandService) {}

 
  @Get()
  @Render('index')
  async root(@Request() req) {
    try {
      const data = await this.concertService.getAllConcerts();

      const pageSize = 6;
      const page = req.query.page || 1; // numéro de la page courante
      const totalItems = data.length;
      const totalPages = Math.ceil(totalItems / pageSize);
      
      const pages = {
        totalItems:totalItems,
        page: page,
        totalPages: totalPages,
        hasPrev: page > 1,
        hasNext: page < totalPages,
        prev: page - 1,
        next: page + 1,
        range: []
      };
      let range=[];
     
      
      // génère un tableau de pages à afficher dans la pagination
      for (let i = 1; i <= totalPages; i++) {
       range.push(i);
      }
      return {data,pages}
      }
     catch (err) {
      return err
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminAuthGuard)
  @Post('/admin')
  postadmin(@Request() req) {
  
    return true;
  }

  @Get('/admin')
  @Render('admin')
  getadmin(@Request() req) {
    return {req};
  }

  @Get('/register')
  @Render('register')
  register_view() {
    return { message: 'this is the register page' };
  }


@Post('/email_verify')
async user_verify(@Response() res, @Request() req) {
  const user = await this.userService.findOne(req.body.email);
  res.send(user);
}



  @Get('/login')
  @Render('login')
  login_view() {
    return { message: 'this is the login page' };
  }

  @Get('/forgotpassword')
  @Render('forgotpassword')
  forgotpassword_view() {
    return { message: 'this is the forgotpassword page' };
  }

 
  @Post('auth/login')
  async login(@Request() req) {
    let jwt= this.authService.login(req.body);
    return jwt
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(AdminAuthGuard)
  @Get('profile')
  // 
  async  getProfile(@Headers() headers: any, @Res() response) {
    const email = headers.email;
  
    try {
      const userData = await this.userService.getuseremail(email);
      
      return response.json({
        message: 'User found',
        userData,
      });
  } catch (err) {
      return response.status(err.status).json(err.response);
      }
   
  }
  
 
 
// @UseGuards(JwtAuthGuard)
  // @UseGuards(AdminAuthGuard)
  @Render('profile')
  @Get('profile/:id')
  async displayUser(@Res() response, @Param('id') userId: string) {
      try {
      const user = await this.userService.getUser(userId);
      const favorites=[]
      console.log(user.favorites)
        for(const bandId of user.favorites){
          try {
            const existingBand = await this.bandService.getBand(bandId);
            // console.log(existingBand.concert_dates)
            // const dates= existingBand.concert_dates.map(dateString => new Date(dateString));
            // Object.assign(existingBand, dates);
            // for(let elem of existingBand.concert_dates ){
            //   const date=new Date(elem)
            //   existingBand.concert_dates.pop()
            //   existingBand.concert_dates.push(date)
            // }
            // console.log(existingBand)
            
             const datesstring = existingBand.concert_dates.map(date => {
              const dateObject = new Date(date);
              return dateObject.toLocaleDateString();
            });
           
            (existingBand as any).dates = datesstring;
            favorites.push(existingBand)
            console.log(favorites)
            } catch (err) {
            // return response.status(err.status).json(err.response);
            const user={_id:"false"}
            }
        }

      return {user,favorites}
      } catch (err) {
      // return response.status(err.status).json(err.response);
      const user={_id:"false"}
      return {user}

      }
  }








  @UseGuards(JwtAuthGuard)
  // @UseGuards(AdminAuthGuard)
  @Get('authenticate')
  getAuthenticate(@Request() req) {
    return true;
  }


@Get('/filter/:id')
@Render('index')
  async getConcert(@Res() response, @Param('id') concertfilter: string) {
    try {
      const data = await this.concertService.findAllRockConcerts(concertfilter);
      return {data}
      return response.status(HttpStatus.OK).json({
        message: 'Concerts found successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  

}




// @Controller('admin')
// @UseGuards(JwtAuthGuard)
// export class AdminController {
//   @Get()
//   findAll() {
//     // only accessible to users with isAdmin = true
//   }
// }

//   @Post('/email_verify')
//   user_verify(@Request() req) {

// try {
//   let result=this.userService.getuseremail(req.body.email)
//   return 1
// } catch (error) {
//   return 0 
// }
//   }

//   @Get()
// async index(@Req() request, @Res() response) {
//   const isAuthenticated = request.isAuthenticated();
//   const isAdmin = request.user && request.user.isAdmin;
//   return response.render('index', { isAuthenticated, isAdmin });
// }
