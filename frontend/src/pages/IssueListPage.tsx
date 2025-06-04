import { useState } from 'react';
import styled from '@emotion/styled';
import { type IssueStatus } from '@/features/issue/types/issue';

import { useUsers } from '@/features/user/hooks/useUsers';
import { useLabels } from '@/features/label/hooks/useLabels';
import useMilestones from '@/features/milestone/hooks/useMilestones';
import { useFilterStore } from '@/store/useFilterStore';
import { buildIssueQueryFromFilter } from '@/features/issue/utils';

import VerticalStack from '@/layouts/VerticalStack';
import IssueAdvancedFilter from '@/features/issue/components/list/IssueAdvancedFilter';
import IssueListContainer from '@/features/issue/components/list/IssueListContainer';
import LabelMilestoneTab from '@/shared/components/LabelMilestoneTab';
import CreateIssueButton from '@/features/issue/components/CreateIssueButton';

export default function IssueListPage() {
  const [selectedTab, setSelectedTab] = useState<IssueStatus>('open');
  const { users } = useUsers();
  const { labels } = useLabels();
  const { milestones } = useMilestones();
  const { labelIds, assigneeIds, authorId, milestoneId } = useFilterStore();

  const queryOptions = buildIssueQueryFromFilter({
    state: selectedTab,
    labelIds,
    assigneeIds,
    authorId,
    milestoneId,
    users,
    labels,
    milestones,
  });

  return (
    <VerticalStack>
      <FilterHeader>
        <IssueAdvancedFilter searchValue={queryOptions} />
        <RightGroup>
          {/* TODO 기능 구현 시 하드코딩 제거 */}
          <LabelMilestoneTab milestoneCount={5} labelCount={3} />
          <CreateIssueButton />
        </RightGroup>
      </FilterHeader>

      <IssueListContainer
        selected={selectedTab}
        onChangeTab={setSelectedTab}
        query={queryOptions}
      />
    </VerticalStack>
  );
}

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
