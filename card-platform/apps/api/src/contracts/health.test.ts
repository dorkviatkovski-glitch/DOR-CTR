import assert from 'node:assert/strict';
import test from 'node:test';
import type { HealthResponse } from './health.js';

test('health contract stays stable', () => {
  const payload: HealthResponse = {
    status: 'ok',
    service: 'cardx-api',
    version: '0.1.0',
    uptimeSeconds: 10,
    timestamp: new Date().toISOString()
  };

  assert.equal(payload.status, 'ok');
  assert.equal(payload.service, 'cardx-api');
});
