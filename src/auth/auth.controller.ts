import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards ,Request} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guards';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.authService.authenticate(dto);

    }
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user; // contains JWT payload
    }

}
