import styled from '@emotion/styled';
import { useState } from 'react';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { type CommentAuthor } from '@/features/issue/types/issue';
import DescriptionHeader from '@/features/issue/components/detail/DescriptionHeader';
import DescriptionBody from '@/features/issue/components/detail/DescriptionBody';
import CommentInputSection from '@/features/newIssue/components/CommentInputSection';
import CommentEditActionButtons from './CommentEditActionButtons';

export interface DescriptionBoxProps {
  content: string | null;
  author: CommentAuthor;
  createdAt: string;
}

export default function DescriptionBox({
  content,
  author,
  createdAt,
}: DescriptionBoxProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(content || '');
  const [isFocused, setIsFocused] = useState(false);
  const currentUser = useCurrentUser();

  const isAuthor = currentUser?.nickname === author.nickname;

  const handleSubmit = () => {
    // TODO: mutation 연결
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      <EditableCommentBlock isEditing={isEditing}>
        <DescriptionHeader
          author={author}
          createdAt={createdAt}
          isAuthor={isAuthor}
          onEditClick={() => setIsEditing(true)}
        />
        {isEditing ? (
          <CommentInputSection
            value={description}
            onChange={setDescription}
            isFocused={isFocused}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        ) : (
          <DescriptionBody content={description} />
        )}
      </EditableCommentBlock>

      {isEditing && (
        <CommentEditActionButtons
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          isSubmitDisabled={!description.trim()}
        />
      )}
    </>
  );
}

const EditableCommentBlock = styled.div<{ isEditing: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius.large};
  box-shadow: ${({ isEditing, theme }) =>
    isEditing
      ? `0 0 0 1px ${theme.neutral.border.active}`
      : `0 0 0 1px ${theme.neutral.border.default}`};

  background-color: ${({ theme }) => theme.neutral.surface.strong};

  overflow: hidden;
  transition: border 0.2s ease;
`;
