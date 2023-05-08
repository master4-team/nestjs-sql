import { v4 as uuid } from 'uuid';
import { CrudDeletePayload, CrudPayload } from '../crud.types';
import { CrudDto } from '../crud.dto';
import { Role } from '../../../../common/decorators/roles';
import { ValidatedUser } from '../../../auth/auth.types';

const id = uuid();
const userId = uuid();

const mockCrudPayload: CrudPayload = {
  id,
  userId,
  displayName: 'displayName',
};

const mockCrudDto: CrudDto = {
  displayName: 'displayName',
};

const mockCrudDeletePayload: CrudDeletePayload = {
  raw: 'raw',
  affected: 1,
};

const mockValidatedUser: ValidatedUser = {
  userId: userId,
  username: 'username',
  role: Role.USER,
};

export {
  mockCrudPayload,
  mockCrudDto,
  mockCrudDeletePayload,
  userId,
  mockValidatedUser,
};
