import { Body, Controller, Post,Get,Query , ValidationPipe , UsePipes} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  register(@Body() dto: RegisterDto) {
    return this.userService.create(dto);
  }


}