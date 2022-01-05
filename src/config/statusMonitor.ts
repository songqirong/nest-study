import { StatusMonitorConfiguration } from 'nest-status-monitor';
const is_dev = process.env.NODE_ENV === 'development',
  protocol = is_dev ? 'http' : 'https',
  port = is_dev ? 8099 : undefined,
  host = is_dev ? 'localhost' : 'nest.persion.cn';
export const statusMonitorConfig: StatusMonitorConfiguration = {
  pageTitle: 'Nest.js Monitoring page',
  port,
  path: 'status',
  ignoreStartsWith: '/health/alive',
  spans: [
    {
      interval: 1, // Every second
      retention: 60, // Keep 60 datapoints in memory
    },
    {
      interval: 5, // Every 5 seconds
      retention: 60, // Keep 60 datapoints in memory
    },
    {
      interval: 15, // Every 15 seconds
      retention: 60, // Keep 60 datapoints in memory
    },
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    responseTime: true,
    rps: true,
    statusCodes: true,
  },
  healthChecks: [
    {
      protocol,
      host,
      path: '/health/nestjs',
      port,
    },
    {
      protocol,
      host,
      path: '/health/typeorm',
      port,
    },
  ],
};
