import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '@/features/auth/utils/tokens';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const token = hashParams.get('access_token');
    const tokenType = hashParams.get('token_type');

    if (token && tokenType) {
      setAccessToken(token, tokenType);

      window.history.replaceState(null, '', '/');
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <p>로그인 처리 중입니다...</p>;
}
