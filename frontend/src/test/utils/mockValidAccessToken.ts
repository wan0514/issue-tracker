import { TOKEN_KEY, TOKEN_TYPE_KEY } from '@/features/auth/utils/tokens';

export default function mockValidAccessToken(expOffsetInSeconds = 1800) {
  const nowInSeconds = Math.floor(Date.now() / 1000);

  const payload = {
    nickname: 'test-user',
    profileImageUrl: 'https://example.com/avatar.png',
    exp: nowInSeconds + expOffsetInSeconds,
  };

  const token = createMockJwt(payload);

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_TYPE_KEY, 'Bearer');
}

// JWT header + payload를 base64로 조합
function createMockJwt(payload: Record<string, unknown>): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const encode = (obj: object) =>
    btoa(JSON.stringify(obj))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

  return `${encode(header)}.${encode(payload)}.signature`;
}
