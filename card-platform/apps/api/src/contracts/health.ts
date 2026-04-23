export type HealthResponse = {
  status: 'ok' | 'degraded';
  service: 'cardx-api';
  version: string;
  uptimeSeconds: number;
  timestamp: string;
};
