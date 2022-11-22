import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { SecurityConfig } from 'src/common/configs/config.interface';
import { SignupInput } from '../dto/input/signup.input';
import { Token } from '../models/token.model';
import { CustomException } from 'src/common/controllerUtils/controllerHandling/customException';
import { ITokenPayload } from '../dto/output/tokenPayload.output';
import { RoleEnum } from '../enum/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService
  ) {}

  async createUser(payload: SignupInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    );

    try {
      const user = await this.prisma.user.create({
        data: {
          email: payload.email,
          password: hashedPassword,
          //role: 'USER',
        },
      });

      return this.generateTokens({
        userId: user.id,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`);
      } else {
        throw new Error(e);
      }
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`E-mail informado não encontrado: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password
    );

    if (!passwordValid) {
      throw new CustomException(`Senha incorreta`, 403);
    }

    const tokenContent: ITokenPayload = {
      userId: user.id,
      email: user.email,
      roles: user.roles as RoleEnum[]
    };
    return this.generateTokens(tokenContent);
  }

  async resetPassword(
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException(`E-mail informado não encontrado: ${email}`);
    }

    if (password != confirmPassword) {
      throw new CustomException(
        `As senhas informadas, não são iguais, por favor verifique`,
        403
      );
    }

    const hashedPassword = await this.passwordService.hashPassword(password);

    const userUpdate = await this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        email: email,
      },
    });

    const tokenContent = {
      userId: user.id,
      email: user.email,
    };
    return this.generateTokens(tokenContent);
  }

  validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  getTokenDecoded(token: string) {
    if (token.toLowerCase().indexOf('bearer') > -1) {
      token = token.split(' ')[1];
    }
    return this.jwtService.decode(token);
  }

  getUserId(token: string): string {
    return this.getTokenDecoded(token)['userId'];
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this.getUserId(token);
    return this.prisma.user.findUnique({ where: { id } });
  }

  generateTokens(payload: { userId: string; isManager?: boolean }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_EXPIRE'),
    });
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
