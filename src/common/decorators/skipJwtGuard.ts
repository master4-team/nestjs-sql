import { SetMetadata } from '@nestjs/common';

export const SKIP_GUARD_KEY = 'isSkipJWTGuard';
export const SkipJwtGuard = () => SetMetadata(SKIP_GUARD_KEY, true);
