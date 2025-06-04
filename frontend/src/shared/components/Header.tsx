import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import Profile from '@/shared/components/Profile';
import Logo from '@/assets/logoMedium.svg?react';
import DarkModeToggle from '@/shared/components/DarkModeToggle';

export default function Header() {
  const user = useCurrentUser();

  return (
    <Wrapper>
      <LeftSection>
        <Link to="/">
          <StyledLogo />
        </Link>
        <DarkModeToggle />
      </LeftSection>
      {user && <Profile id={user.nickname} imageUrl={user.profileImageUrl} />}
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 27px 0;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledLogo = styled(Logo)`
  width: 199px;
  height: 40px;
  color: ${({ theme }) => theme.neutral.text.strong};
`;
