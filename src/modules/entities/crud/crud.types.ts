import { DeleteResult } from 'typeorm';
import { CrudEntity } from './crud.entity';

export type CrudPayload = CrudEntity;
export type CrudDeletePayload = DeleteResult;
