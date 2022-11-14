import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private dbIndicator: TypeOrmHealthIndicator,
    private memoryIndicator: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.dbIndicator.pingCheck('database'),
      () => this.memoryIndicator.checkHeap('memory_heap', 500 * 1024 * 1024),
    ]);
  }
}
