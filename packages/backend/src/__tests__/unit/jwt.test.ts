import { describe, it, expect } from 'vitest';
import { signToken, verifyToken } from '../../lib/jwt.js';

const TEST_SECRET = 'test-jwt-secret-for-unit-tests';
const env = { JWT_SECRET: TEST_SECRET };

describe('JWT', () => {
  it('signs and verifies a token', async () => {
    const token = await signToken({
      userId: 'usr_test',
      spaceId: 'spc_test',
      role: 'staff',
      tokenVersion: 0,
    }, env);

    expect(token).toBeTruthy();
    expect(token.split('.')).toHaveLength(3);

    const payload = await verifyToken(token, env);
    expect(payload).toBeTruthy();
    expect(payload!.userId).toBe('usr_test');
    expect(payload!.spaceId).toBe('spc_test');
    expect(payload!.role).toBe('staff');
    expect(payload!.tokenVersion).toBe(0);
    expect(payload!.jti).toBeTruthy();
    expect(payload!.iat).toBeTruthy();
    expect(payload!.exp).toBeGreaterThan(payload!.iat);
  });

  it('rejects token with wrong secret', async () => {
    const token = await signToken({
      userId: 'usr_test', spaceId: 'spc_test', role: 'staff', tokenVersion: 0,
    }, env);

    const payload = await verifyToken(token, { JWT_SECRET: 'wrong-secret' });
    expect(payload).toBeNull();
  });

  it('rejects tampered token', async () => {
    const token = await signToken({
      userId: 'usr_test', spaceId: 'spc_test', role: 'staff', tokenVersion: 0,
    }, env);

    const parts = token.split('.');
    parts[1] = btoa(JSON.stringify({ userId: 'hacker', spaceId: 'spc_test', role: 'platform_owner' }));
    const tampered = parts.join('.');

    const payload = await verifyToken(tampered, env);
    expect(payload).toBeNull();
  });

  it('rejects malformed token', async () => {
    expect(await verifyToken('not.a.token', env)).toBeNull();
    expect(await verifyToken('', env)).toBeNull();
    expect(await verifyToken('x.y', env)).toBeNull();
  });

  it('generates unique jti per token', async () => {
    const t1 = await signToken({ userId: 'usr_test', spaceId: 'spc_test', role: 'staff', tokenVersion: 0 }, env);
    const t2 = await signToken({ userId: 'usr_test', spaceId: 'spc_test', role: 'staff', tokenVersion: 0 }, env);

    const p1 = await verifyToken(t1, env);
    const p2 = await verifyToken(t2, env);
    expect(p1!.jti).not.toBe(p2!.jti);
  });

  it('throws when JWT_SECRET is missing', async () => {
    await expect(signToken({
      userId: 'test', spaceId: 'test', role: 'staff', tokenVersion: 0,
    })).rejects.toThrow('JWT_SECRET');
  });
});
