/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(userData: { email: string; name: string; password: string }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user);
    const { password, ...result } = savedUser;
    return result;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user.id, name: user.name };
      return {
        access_token: this.jwtService.sign(payload),
        user: { id: user.id, email: user.email, name: user.name },
      };
    }
    return null;
  }

  async validateUser(email: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
