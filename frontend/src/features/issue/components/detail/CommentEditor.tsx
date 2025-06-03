import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styled from '@emotion/styled';
import useCreateComment from '@/features/issue/hooks/useCreateComment';
import CommentInputSection from '@/features/newIssue/components/CommentInputSection';
import NewCommentActionButton from '@/features/issue/components/detail/NewCommentActionButton';

export default function CommentEditor() {
  const { id } = useParams();
  const [comment, setComment] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  const issueId = Number(id);

  const { mutate: createComment, isPending } = useCreateComment(issueId);

  const handleCreateComment = () => {
    if (!comment.trim()) return;
    createComment(comment, {
      onSuccess: () => {
        setComment('');
      },
      onError: err => {
        console.error(err.message);
        // TODO 에러처리
      },
    });
  };

  return (
    <NewCommentWrapper>
      <CommentInputWrapper isFocused={isFocused}>
        <CommentInputSection
          value={comment}
          onChange={value => setComment(value)}
          isFocused={isFocused}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          initialHeight={80}
        />
      </CommentInputWrapper>

      <NewCommentActionButton
        isSubmitDisabled={comment.trim() === '' || isPending}
        onSubmit={handleCreateComment}
      />
    </NewCommentWrapper>
  );
}

const NewCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 32px;
`;

const CommentInputWrapper = styled.section<{ isFocused: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;

  border-radius: ${({ theme }) => theme.radius.medium};
  overflow: hidden;

  background-color: ${({ isFocused, theme }) =>
    isFocused ? theme.neutral.surface.default : theme.neutral.surface.bold};

  box-shadow: ${({ isFocused, theme }) =>
    isFocused ? `0 0 0 1px ${theme.neutral.border.active}` : 'none'};
`;
