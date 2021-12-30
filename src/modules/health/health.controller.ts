import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('健康检查')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get('nestjs')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('nestjs', 'http://localhost:8099'),
    ]);
  }

  @Get('typeorm')
  @HealthCheck()
  checkTypeorm() {
    return this.health.check([() => this.db.pingCheck('database-connection')]);
  }
}
