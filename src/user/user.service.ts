import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async create(createUserDto: RegisterDto) {
    const {password} = createUserDto;
    const hashed = await bcrypt.hash(password, 10);
      const user = this.repo.create({
      ...createUserDto,
      password: hashed,
    });
    return this.repo.save(user);
  }
}
