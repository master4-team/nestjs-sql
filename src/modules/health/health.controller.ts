import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  DiskHealthIndicator,
  MemoryHealthIndicator,
  HealthCheckResult,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { SkipJwtGuard } from '../../common/decorators/skipJwtGuard';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  @SkipJwtGuard()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'Master4 app',
          `http://${this.configService.get<string>(
            'host',
          )}:${this.configService.get<number>('port')}/api/health/ping`,
        ),
      () => this.db.pingCheck('PG', { timeout: 1500 }),
      () =>
        this.disk.checkStorage('Storage', { path: '/', thresholdPercent: 0.7 }),
      () => this.memory.checkHeap('memory_heap', 1024 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 1024 * 1024 * 1024),
    ]);
  }

  @Get('ping')
  @SkipJwtGuard()
  async ping(): Promise<string> {
    return 'OK';
  }
}
