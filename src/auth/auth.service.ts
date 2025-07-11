// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service'; 
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: LoginDto) {
    const user = await this.validateUser(input);
    return this.login(user);
  }

  async validateUser(input: LoginDto): Promise<User> {
    const user = await this.usersService.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('invalid email or password');
    }

    const isPasswordMatch = await bcrypt.compare(
      input.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('invalid email or password');
    }

    return user;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }
}
