import styled from '@emotion/styled';
import { useState } from 'react';
import CommentInputSection from '@/features/newIssue/components/CommentInputSection';
import TitleInput from '@/features/newIssue/components/TitleInput';

interface NewIssueFormProps {
  title: string;
  onTitleChange: (value: string) => void;

  content: string;
  onContentChange: (value: string | ((prev: string) => string)) => void;
}

export default function NewIssueForm({
  title,
  content,
  onTitleChange,
  onContentChange,
}: NewIssueFormProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormSection>
      <TitleInput value={title} onChange={onTitleChange} label="제목" />

      <CommentInputWrapper isFocused={isFocused}>
        <CommentInputSection
          value={content}
          onChange={onContentChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          isFocused={isFocused}
          initialHeight={448}
        />
      </CommentInputWrapper>
    </FormSection>
  );
}

const FormSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
