import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { VALIDATION_ERROR } from '../../../common/constants/errors';
import { BusinessException } from '../../../common/exceptions';
import { LoginDto } from '../auth.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const body = context.switchToHttp().getRequest().body;
    const validationErrors = await validate(plainToClass(LoginDto, body));
    if (validationErrors.length > 0) {
      throw new BusinessException(VALIDATION_ERROR(validationErrors), null);
    }
    return (await super.canActivate(context)) as boolean;
  }
}
