import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports:[UserService],
  controllers: [UserController]
})
export class UserModule {}
