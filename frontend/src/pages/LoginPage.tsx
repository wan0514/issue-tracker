import styled from '@emotion/styled';
import OAuthLoginButton from '@/features/auth/components/OAuthLoginButton';
import DarkModeToggle from '@/shared/components/DarkModeToggle';

export default function LoginPage() {
  return (
    <Layout>
      <DarkModeToggle />
      <Container>
        <Title>Issue Tracker</Title>
        <OAuthLoginButton />
        <Divider />
      </Container>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 50px;
  font-style: italic;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.neutral.text.strong};
`;

const Divider = styled.div`
  height: 56px;
`;
