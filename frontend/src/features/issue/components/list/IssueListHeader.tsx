import styled from '@emotion/styled';
import IssueTabFilter from '@/features/issue/components/list/IssueTabFilter';
import AssigneeDropdown from './filters/AssigneeDropdown';
import AuthorDropdown from './filters/AuthorDropdown';
import LabelDropdown from './filters/LabelDropdown';
import MilestoneDropdown from './filters/MilestoneDropdown';

interface ListHeaderProps {
  openCount: number;
  closeCount: number;
  selected: 'open' | 'closed';
  onChangeTab: (status: 'open' | 'closed') => void;
}

export default function IssueListHeader({
  openCount,
  closeCount,
  selected,
  onChangeTab,
}: ListHeaderProps) {
  return (
    <HeaderWrapper>
      <LeftSection>
        <Checkbox type="checkbox" />
        {/* TODO 공통 체크박스로 변경 */}

        <IssueTabFilter
          openCount={openCount}
          closeCount={closeCount}
          selected={selected}
          onChangeTab={onChangeTab}
        />
      </LeftSection>

      <RightSection>
        <AssigneeDropdown />
        <LabelDropdown />
        <MilestoneDropdown />
        <AuthorDropdown />
      </RightSection>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 32px;

  border-bottom: 1px solid ${({ theme }) => theme.neutral.border.default};
  background-color: ${({ theme }) => theme.neutral.surface.default};
  color: ${({ theme }) => theme.neutral.text.default};
  ${({ theme }) => theme.typography.availableMedium16};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 32px;
`;

const RightSection = styled.div`
  display: flex;
  gap: 32px;
`;

const Checkbox = styled.input`
  display: flex;
  justify-content: center;
  width: 16px;
  height: 32px;
  cursor: pointer;
`;
