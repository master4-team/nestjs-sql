import { INestApplicationContext } from '@nestjs/common';
import { createRootUser } from '../modules/database/seeds/rootUser';
import { EncryptionAndHashService } from '../modules/encryptionAndHash/encryptionAndHash.service';
import { LoggerService } from '../modules/logger/logger.service';
import { UserEntity } from '../modules/entities/user/user.entity';
import { generateCode } from '../utils/codeGenerator';
import { logWrapper } from './logWrapper';
import { getRepositoryToken } from '@nestjs/typeorm';

const LOG_CONTEXT = 'Database initialization';

async function initDb(appModule: INestApplicationContext) {
  const userRepository = appModule.get(getRepositoryToken(UserEntity));
  const hashService = appModule.get(EncryptionAndHashService);
  const logger = appModule.get(LoggerService);
  logger.setLogId(generateCode({ length: 8 }));

  logger.log_('Initialize database...', LOG_CONTEXT);

  await logWrapper<UserEntity>(
    logger,
    createRootUser,
    [userRepository, hashService],
    'Create root user',
  );

  logger.log_('Initialize database successfully!', LOG_CONTEXT);
}

export { initDb };
