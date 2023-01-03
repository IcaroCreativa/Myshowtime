import { UserService } from '../../service/user/user.service';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';



@Injectable()

export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}


  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getuseremail(email);
    const result = await bcrypt.compare(pass, user.password);
    if (result && user) {
      console.log('Mot de passe correct');
      const { password, ...result } = user;
      return result;
    } else {
      console.log('Mot de passe incorrect');
      return null;
    }
  }



  async login(user: any) {
    try {
        console.log('Dans auth.service1')
        console.log('Appel à la fonction login2')
        const result = await this.validateUser(user.email,user.password)
        
        if (result){
          
            console.log(result._doc.isadmin)
            
            const payload = { email: user.email, password: user.password, isadmin:user.isadmin };
            
            return {
                access_token: this.jwtService.sign(payload),
                admin: result._doc.isadmin,
                user: result._doc
            }
        } else {
          const message: {[key: string]: string} = {
            error: 'user not found',
           
          };
      
            return message;
        }
    } catch (error) {
        console.error(error);
        return {
            error:'user not found'
            
        }
    }
 
}
}




