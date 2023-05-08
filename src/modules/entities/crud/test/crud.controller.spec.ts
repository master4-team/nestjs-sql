import { Test, TestingModule } from '@nestjs/testing';
import { CrudDto } from '../crud.dto';
import { CrudService } from '../crud.service';
import { CrudDeletePayload, CrudPayload } from '../crud.types';
import {
  mockCrudDeletePayload,
  mockCrudDto,
  mockCrudPayload,
} from './crud.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CrudEntity } from '../crud.entity';
import { mockRepository } from '../../../database/test/database.service.mock';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { CrudController } from '../crud.controller';

const moduleMocker = new ModuleMocker(global);

describe('CrudController', () => {
  let crudService: CrudService;
  let crudController: CrudController;

  let crudPayload: CrudPayload;
  let crudDeletePayload: CrudDeletePayload;
  let crudDto: CrudDto;

  beforeEach(async () => {
    crudPayload = { ...mockCrudPayload };
    crudDeletePayload = { ...mockCrudDeletePayload };
    crudDto = { ...mockCrudDto };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [CrudController],
    })
      .useMocker((target) => {
        if (target === CrudService) {
          return {
            find: jest.fn().mockResolvedValue([crudPayload]),
            findByUserId: jest.fn().mockResolvedValue(crudPayload),
            findById: jest.fn().mockResolvedValue(crudPayload),
            save: jest.fn().mockResolvedValue(crudPayload),
            updateById: jest.fn().mockResolvedValue(crudPayload),
            deleteById: jest.fn().mockResolvedValue(crudDeletePayload),
          };
        }

        if (typeof target === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            target,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    crudService = app.get<CrudService>(CrudService);
    crudController = app.get<CrudController>(CrudController);
  });

  it('should be defined', () => {
    expect(crudController).toBeDefined();
  });
});
