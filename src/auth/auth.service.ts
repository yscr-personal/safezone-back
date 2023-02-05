import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { CreateUserDto } from '../users/interfaces';
import { UsersService } from '../users/users.service';
import { AuthUserDto, JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('JWT_SECRET') private readonly jwtSecret: string,
  ) {}

  async login(email: string, password: string): Promise<AuthUserDto> {
    const user = await this.usersService.findByEmail(email);

    if (
      !user ||
      !(await this.validatePassword({
        data: password,
        encrypted: user.password,
      }))
    ) {
      const reason = 'Invalid email or password';
      const err = new UnauthorizedException(reason);
      this.logger.error(
        `[${AuthService.name}] Fail to login - ${reason}`,
        err.stack,
      );
      throw err;
    }
    return {
      ...user,
      access_token: this.jwtService.sign({ sub: user.id }),
    };
  }

  async register(
    body: CreateUserDto,
  ): Promise<{ ok: boolean; message: string }> {
    const [foundEmail, foundUsername] = await Promise.all([
      this.usersService.findByEmail(body.email),
      this.usersService.findByUsername(body.username),
    ]);

    if (foundEmail || foundUsername) {
      const reason = `${foundEmail ? 'Email' : 'Username'} already in use`;
      const err = new UnauthorizedException(reason);
      this.logger.error(
        `[${AuthService.name}] Fail to register - ${reason}`,
        err.stack,
      );
      throw err;
    }

    const salt = await this.generateSalt();
    this.usersService.create({
      ...body,
      password: await this.hashPassword(body.password, salt),
    });
    return {
      ok: true,
      message: 'user.created',
    };
  }

  async validateToken(token: string) {
    const payload: JwtPayload = this.jwtService.verify(token, {
      secret: this.jwtSecret,
      ignoreExpiration: false,
    });
    if (payload.sub) {
      return await this.usersService.findById(payload.sub);
    }
  }

  private async validatePassword({
    data,
    encrypted,
  }: {
    data: string;
    encrypted: string;
  }) {
    return await compare(data, encrypted);
  }

  private async hashPassword(password: string, salt: string | number = 10) {
    return await hash(password, salt);
  }

  private async generateSalt() {
    const rounds = this.configService.get<number>('SALT_ROUNDS');
    return await genSalt(rounds);
  }
}
