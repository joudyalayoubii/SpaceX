import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from './auth.guards';
import { JwtService } from '@nestjs/jwt'; 

@Injectable()
export class RoleGuard extends AuthGuard {
   constructor(jwtService: JwtService) {
    super(jwtService); 
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);

    if (!canActivate) {
      return false; 
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; 

    
    if (user.role !== 'admin') {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true; 
  }
}
