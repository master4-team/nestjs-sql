import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.pg.host'),
        port: configService.get<number>('database.pg.port'),
        username: configService.get<string>('database.pg.username'),
        password: configService.get<string>('database.pg.password'),
        database: configService.get<string>('database.pg.database'),
        entities: [],
        synchronize:
          configService.get<string>('database.pg.synchronize') === 'true',
        dropSchema:
          configService.get<string>('database.pg.dropSchema') === 'true',
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
