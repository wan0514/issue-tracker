import { Navigate } from 'react-router-dom';
import { getAccessTokenPair } from '@/features/auth/utils/tokens';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = getAccessTokenPair();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
