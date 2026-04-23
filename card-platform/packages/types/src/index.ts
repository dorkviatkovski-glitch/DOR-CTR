export type HealthStatus = 'ok' | 'degraded';

export type HealthResponse = {
  status: HealthStatus;
  service: 'cardx-api';
  version: string;
  uptimeSeconds: number;
  timestamp: string;
};

export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    requestId?: string;
  };
};
