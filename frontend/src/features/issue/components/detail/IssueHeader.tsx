import { useState } from 'react';
import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import usePatchIssueTitle from '@/features/issue/hooks/usePatchIssueTitle';
import usePatchIssueState from '@/features/issue/hooks/usePatchIssueState';
import IssueMeta from './IssueMeta';
import IssueHeaderActions from './IssueHeaderActions';
import TextInput from '@/shared/components/TextInput';

interface IssueHeaderProps {
  isClosed: boolean;
  issueId: number;
  title: string;
  author: {
    id: number;
    nickname: string;
    profileImage: string;
  };
  createdAt: string;
  commentCount: number;
}

export default function IssueHeader({
  isClosed,
  issueId,
  title,
  author,
  createdAt,
  commentCount,
}: IssueHeaderProps) {
  const queryClient = useQueryClient();
  const { mutate: patchTitle } = usePatchIssueTitle(issueId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const isSubmitDisabled = editedTitle.trim() === title.trim();

  const { mutate: toggleIssueState, isPending: isToggleLoading } =
    usePatchIssueState(issueId);

  const handleToggle = () => {
    if (isToggleLoading) return;

    toggleIssueState(
      { issueId, targetClosed: !isClosed },
      {
        onSuccess: () => {
          // 이슈가 성공적으로 닫힌 후 마일스톤 정보를 다시 불러옴
          queryClient.invalidateQueries({ queryKey: ['milestones'] });
          // 또는 queryClient.invalidateQueries(['milestone', milestoneId]);
        },
      },
    );
  };

  const handleSubmitEdit = () => {
    patchTitle(editedTitle);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(title);
    setIsEditing(false);
  };

  return (
    <HeaderWrapper>
      <TopRow>
        {isEditing ? (
          <TextInput
            label="제목"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            placeholder="이슈의 제목을 입력해주세요"
          />
        ) : (
          <Title>
            <TitleText>{title}</TitleText>
            <IssueNumber>#{issueId}</IssueNumber>
          </Title>
        )}

        <IssueHeaderActions
          isEditing={isEditing}
          onEditStart={() => setIsEditing(true)}
          onEditCancel={handleCancelEdit}
          onEditSubmit={handleSubmitEdit}
          isClosed={isClosed}
          onToggleIssueState={handleToggle}
          isSubmitDisabled={isSubmitDisabled}
        />
      </TopRow>

      <IssueMeta
        isClosed={isClosed}
        createdAt={createdAt}
        authorName={author.nickname}
        commentCount={commentCount}
      />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  min-height: 48px;
`;

const Title = styled.h1`
  display: inline;
  flex-wrap: wrap;
  gap: 8px;

  color: ${({ theme }) => theme.neutral.text.strong};
  ${({ theme }) => theme.typography.displayBold32};
`;

const TitleText = styled.span`
  flex: 1;
  word-break: break-word;
  overflow-wrap: anywhere;
  margin-right: 8px;
`;

const IssueNumber = styled.span`
  align-self: flex-start;
  color: ${({ theme }) => theme.neutral.text.weak};
  white-space: nowrap;
`;
