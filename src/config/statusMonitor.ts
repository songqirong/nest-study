import { StatusMonitorConfiguration } from 'nest-status-monitor';
export const statusMonitorConfig: StatusMonitorConfiguration = {
  pageTitle: 'Nest.js Monitoring page',
  port: 8099,
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
      protocol: 'http',
      host: 'localhost',
      path: '/health/nestjs',
      port: 8099,
    },
    {
      protocol: 'https',
      host: 'localhost',
      path: '/health/typeorm',
      port: 8099,
    },
  ],
};
