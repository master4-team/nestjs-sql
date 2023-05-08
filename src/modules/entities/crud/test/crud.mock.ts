import { v4 as uuid } from 'uuid';
import { CrudDeletePayload, CrudPayload } from '../crud.types';
import { CrudDto } from '../crud.dto';

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

export { mockCrudPayload, mockCrudDto, mockCrudDeletePayload, userId };
