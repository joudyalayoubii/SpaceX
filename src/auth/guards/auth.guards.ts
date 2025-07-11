import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    protected jwtService: JwtService;

  constructor(jwtService: JwtService) {
    this.jwtService = jwtService;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET, 
      });
      console.log("the payload is" , payload)

      request.user = payload;

      return true; 
    } catch (error) {
      console.error("authhhhhhhhh is",error);
      
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
