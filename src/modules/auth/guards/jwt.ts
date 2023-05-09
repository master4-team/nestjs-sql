import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { SKIP_GUARD_KEY } from '../../../common/decorators/skipJwtGuard';
import { ErrorMessageEnum } from '../../../common/types';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isSkipJWTGuard = this.reflector.get<boolean>(
      SKIP_GUARD_KEY,
      context.getHandler(),
    );
    if (isSkipJWTGuard) return true;

    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException(ErrorMessageEnum.accessTokenIsMissing);
    }

    return super.canActivate(context) as boolean;
  }
}
