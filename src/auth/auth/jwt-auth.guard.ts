import { AuthGuard } from '@nestjs/passport';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from '../../schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}


@Injectable()
export class AdminAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.body;
    console.log("je teste this.canActivate");
    console.log('1-------------')
    console.log(user.isadmin);
    console.log('2-------------')
    const result = await bcrypt.compare("true",user.isadmin);
    console.log(result);
    return result
    
    
    // return user.isadmin;
  }
}