import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import useIssueDetail from '@/features/issue/hooks/useIssueDetail';
import useIssueComments from '@/features/issue/hooks/useIssueComments';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';

import Divider from '@/shared/components/Divider';
import IssueHeader from '@/features/issue/components/detail/IssueHeader';
import IssueMainSection from '@/features/issue/components/detail/IssueMainSection';
import IssueDeleteButton from '@/features/issue/components/detail/IssueDeleteButton';
import VerticalStack from '@/layouts/VerticalStack';
import IssueDetailSidebar from '@/features/issue/components/detail/IssueDetailSidebar';

export default function IssueDetailPage() {
  const { id } = useParams();
  const issueId = Number(id);
  const currentUser = useCurrentUser();

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

  // TODO 로딩,에러 상태에 따라 분기처리 내부적으로 처리
  if (isIssueDetailLoading || isCommentLoading) {
    return <div>로딩 중...</div>;
  }

  if (isIssueDetailError || isCommentError) {
    return <div>에러 발생</div>;
  }

  if (!issueDetail || !commentList) return;

  const isAuthor = currentUser?.nickname === issueDetail.author.nickname;

  return (
    <VerticalStack>
      <IssueHeader
        {...issueDetail}
        issueId={issueDetail.id}
        commentCount={commentList.length}
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
          <IssueDetailSidebar issueId={issueId} />
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
  min-width: 288px;
`;
