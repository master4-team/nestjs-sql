import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/base.service';
import { CrudEntity } from './crud.entity';
import { CrudPayload } from './crud.types';
import { ParsedFilterQuery } from '../../filter/types';

@Injectable()
export class CrudService extends BaseService<CrudEntity> {
  constructor(
    @InjectRepository(CrudEntity)
    private readonly crudRepository: Repository<CrudEntity>,
  ) {
    super(crudRepository);
  }

  async findByUserId(
    userId: string,
    filter: ParsedFilterQuery<CrudEntity>,
  ): Promise<CrudPayload[]> {
    const where = filter.where || [];
    if (!where.length) {
      where.push({
        userId,
      });
    } else {
      where.forEach((item) => {
        item.userId = userId;
      });
    }

    filter.where = where;
    filter.relations = { user: true };

    return await this.find(filter);
  }
}
