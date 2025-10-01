// src/auth/auth.service.ts

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compareSync, hashSync } from 'bcrypt-ts';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  private pepper = process.env.SECRET_KEY;

  async signup(signupDto: SignupDto) {
    try {
      const salted = signupDto.password + this.pepper;
      const hashedPassword = hashSync(salted, 12);

      const user = await this.usersService.create({
        first_name: signupDto.first_name,
        last_name: signupDto.last_name,
        email: signupDto.email,
        password: hashedPassword,
        gender: signupDto.gender,
        date_of_birth: new Date(signupDto.date_of_birth),
      });
      if (!user) {
        throw new NotFoundException('Failed to create user when signin in!');
      }

      const payload: Omit<User, 'password' | 'date_of_birth' | 'gender'> = {
        user_id: user.user_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      };
      const access_token = this.jwtService.sign(payload);
      return {
        access_token: access_token,
      };
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: loginDto.email,
        },
      });
      const salted = loginDto.password + this.pepper;
      const isMatch = compareSync(salted, user.password);

      if (!isMatch) throw new ForbiddenException('Invalid credentials!');
      const payload: Omit<User, 'password' | 'date_of_birth' | 'gender'> = {
        user_id: user.user_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      };
      const access_token = this.jwtService.sign(payload);
      return {
        access_token: access_token,
      };
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }
}
