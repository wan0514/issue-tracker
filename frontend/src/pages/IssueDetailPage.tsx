import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import useIssueAssignees from '@/features/issue/hooks/useIssueAssignees';
import useIssueLabels from '@/features/issue/hooks/useIssueLabels';
import useIssueMilestone from '@/features/issue/hooks/useIssueMilestone';
import useIssueDetail from '@/features/issue/hooks/useIssueDetail';
import useIssueComments from '@/features/issue/hooks/useIssueComments';
import usePatchIssueState from '@/features/issue/hooks/usePatchIssueState';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';

import Divider from '@/shared/components/Divider';
import IssueHeader from '@/features/issue/components/detail/IssueHeader';
import IssueMainSection from '@/features/issue/components/detail/IssueMainSection';
import IssueSidebar from '@/shared/components/sidebar';
import IssueDeleteButton from '@/features/issue/components/detail/IssueDeleteButton';
import VerticalStack from '@/layouts/VerticalStack';

export default function IssueDetailPage() {
  const { id } = useParams();
  const issueId = Number(id);
  const currentUser = useCurrentUser();

  const { mutate: toggleIssueState, isPending: isToggleLoading } =
    usePatchIssueState(issueId);

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

  const {
    data: issueDetail,
    isLoading: isIssueDetailLoading,
    isError: isIssueDetailError,
  } = useIssueDetail(issueId);

  const {
    data: commentList,
    isLoading: isCommentLoading,
    isError: isCommentError,
  } = useIssueComments(issueId);

  const handleIssueStateToggle = () => {
    if (!issueDetail || isToggleLoading) return;
    toggleIssueState({ issueId, targetClosed: !issueDetail.isClosed });
  };

  // TODO 로딩,에러 상태에 따라 분기처리 내부적으로 처리
  if (
    isIssueDetailLoading ||
    isCommentLoading ||
    isLabelsLoading ||
    isAssigneesLoading ||
    isMilestoneLoading
  ) {
    return <div>로딩 중...</div>;
  }

  if (
    isIssueDetailError ||
    isCommentError ||
    isLabelsError ||
    isAssigneesError ||
    isMilestoneError
  ) {
    return <div>에러 발생</div>;
  }

  if (!issueDetail || !commentList || !issueAssignees || !issueLabels) return;

  const selectedAssigneeIds = issueAssignees.map(assignee => assignee.id);
  const selectedLabelIds = issueLabels.map(label => label.id);
  const selectedMilestoneId = issueMilestone?.id ?? null;

  const isAuthor = currentUser?.nickname === issueDetail.author.nickname;

  return (
    <VerticalStack>
      <IssueHeader
        {...issueDetail}
        issueNumber={issueDetail.id}
        commentCount={commentList.length}
        onToggleIssueState={handleIssueStateToggle}
      />
      <Divider />
      <MainArea>
        <IssueMainSection
          comments={commentList}
          content={issueDetail.content}
          createdAt={issueDetail.createdAt}
          author={issueDetail.author}
        />
        <SideSection>
          {/* TODO 이슈 상세 상태 재설계후 함수 추가 */}
          <IssueSidebar
            selectedAssigneeIds={selectedAssigneeIds}
            onToggleAssignee={() => {}}
            selectedLabelIds={selectedLabelIds}
            onToggleLabel={() => {}}
            selectedMilestoneId={selectedMilestoneId}
            onSelectMilestone={() => {}}
          />
          {isAuthor && <IssueDeleteButton issueId={issueId} />}
        </SideSection>
      </MainArea>
    </VerticalStack>
  );
}

const MainArea = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;
`;

const SideSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
`;
