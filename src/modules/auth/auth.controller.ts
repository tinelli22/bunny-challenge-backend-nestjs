import { Controller, Post, HttpStatus, Body, Patch } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginInput } from './dto/input/login.input';
import { SignupInput } from './dto/input/signup.input';
import { AuthService } from './services/auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Successful Login' })
  async login(
    @Body() { email, password }: LoginInput
  ): Promise<any> {
    const { accessToken, refreshToken } = await this.authService.login(
      email.toLowerCase(),
      password
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('signup')
  async signup(@Body() data: SignupInput) {
    
    return await this.authService.createUser(data);
  }
}
