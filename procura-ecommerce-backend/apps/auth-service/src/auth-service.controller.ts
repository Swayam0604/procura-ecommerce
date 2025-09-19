/* eslint-disable */
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth-service.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() userData: { email: string; name: string; password: string },
  ) {
    return this.authService.register(userData);
  }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    const result = await this.authService.login(
      credentials.email,
      credentials.password,
    );
    if (!result) {
      return { error: 'Invalid credentials' };
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('health')
  getHealth() {
    return { message: 'Auth Service is running!', timestamp: new Date() };
  }
}
