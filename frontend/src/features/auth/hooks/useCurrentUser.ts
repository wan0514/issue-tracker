import { useMemo } from 'react';
import { decodeAccessToken } from '@/shared/utils/decodeAccessToken';
import { getAccessTokenPair } from '@/features/auth/utils/tokens';

export function useCurrentUser() {
  const { token } = getAccessTokenPair();

  const user = useMemo(() => {
    if (!token) return null;
    return decodeAccessToken(token);
  }, [token]);

  return user;
}
