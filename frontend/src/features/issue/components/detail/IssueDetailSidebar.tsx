import styled from '@emotion/styled';
import useIssueLabels from '@/features/issue/hooks/useIssueLabels';
import useIssueAssignees from '@/features/issue/hooks/useIssueAssignees';
import useIssueMilestone from '@/features/issue/hooks/useIssueMilestone';

import { usePutIssueLabels } from '@/features/issue/hooks/usePutIssueLabels';
import { usePutIssueAssignees } from '@/features/issue/hooks/usePutIssueAssignees';
import { usePatchIssueMilestone } from '@/features/issue/hooks/usePatchIssueMilestone';

import IssueSidebar from '@/shared/components/sidebar';

interface Props {
  issueId: number;
}

export default function IssueDetailSidebar({ issueId }: Props) {
  const {
    issueLabels,
    isLoading: isLabelsLoading,
    isError: isLabelsError,
  } = useIssueLabels(issueId);

  const {
    issueAssignees,
    isLoading: isAssigneesLoading,
    isError: isAssigneesError,
  } = useIssueAssignees(issueId);

  const {
    issueMilestone,
    isLoading: isMilestoneLoading,
    isError: isMilestoneError,
  } = useIssueMilestone(issueId);

  const { mutate: mutateLabel } = usePutIssueLabels(issueId);
  const { mutate: mutateAssignee } = usePutIssueAssignees(issueId);
  const { mutate: mutateMilestone } = usePatchIssueMilestone(issueId);

  const isLoading = isLabelsLoading || isAssigneesLoading || isMilestoneLoading;
  const isError = isLabelsError || isAssigneesError || isMilestoneError;

  if (isError) return <div>데이터를 불러오는 데 실패했습니다.</div>;

  const selectedAssigneeIds = issueAssignees.map(assignee => assignee.id);
  const selectedLabelIds = issueLabels.map(label => label.id);
  const selectedMilestoneId = issueMilestone?.id ?? null;

  return (
    <SidebarWrapper visible={!isLoading}>
      {!isLoading && (
        <IssueSidebar
          initialAssigneeIds={selectedAssigneeIds}
          onSaveAssignee={mutateAssignee}
          initialLabelIds={selectedLabelIds}
          onSaveLabel={mutateLabel}
          initialMilestoneId={selectedMilestoneId}
          onSaveMilestone={mutateMilestone}
        />
      )}
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.div<{ visible: boolean }>`
  min-height: 300px;
  min-width: 288px;
  flex-shrink: 0;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;
