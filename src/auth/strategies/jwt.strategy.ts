import { AuthService } from './../auth.service';
import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

type JwtPayload = {
  userId: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('jwtSecret'),
    });
    this.logger.log(
      "configService.get<string>('jwtSecret')",
      configService.get<string>('jwtSecret'),
    );
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log(context);
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource.',
      );
    }
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('jwtSecret'),
      });

      const user = await this.usersService.findOne(payload.userId);

      if (!user) {
        throw new UnauthorizedException('User not found.');
      }
      request['user'] = user;
    } catch {
      throw new UnauthorizedException(
        'You are not authorized to access this resource.',
      );
    }
    return true;
  }

  async validate(payload: JwtPayload) {
    try {
      const user = await this.authService.validateUser(payload.userId);
      if (!user) {
        throw new UnauthorizedException();
      }
      return payload;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  private extractTokenFromHeader(req: Request): string | undefined {
    const authHeader =
      req.headers['authorization'] || req.headers['Authorization'];
    const [type, token] = (authHeader as string).split(' ') || [];
    this.logger.log(type, token);

    return type === 'Bearer' ? token : undefined;
  }
}
