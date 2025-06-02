import { API } from '@/shared/constants/api';
import Button from '@/shared/components/Button';

export default function OAuthLoginButton() {
  const handleOAuthLogin = () => {
    window.location.href = API.OAUTH_LOGIN;
  };

  return (
    <Button variant="outline" fullWidth={true} onClick={handleOAuthLogin}>
      GitHub 계정으로 로그인
    </Button>
  );
}
