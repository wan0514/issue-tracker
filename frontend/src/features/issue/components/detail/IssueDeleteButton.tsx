import { useDeleteIssue } from '@/features/issue/hooks/useDeleteIssue';
import TrashIcon from '@/assets/icons/trash.svg?react';
import styled from '@emotion/styled';

interface IssueDeleteButtonProps {
  issueId: number;
}

export default function IssueDeleteButton({ issueId }: IssueDeleteButtonProps) {
  const { mutate: deleteIssue, isPending } = useDeleteIssue();

  const handleClick = () => {
    deleteIssue(issueId);
  };

  return (
    <TabButton onClick={handleClick} disabled={isPending}>
      <IconWrapper>
        <TrashIcon />
      </IconWrapper>
      <Label>이슈 삭제</Label>
    </TabButton>
  );
}

const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
  margin-right: 16px;
  color: ${({ theme }) => theme.danger.text.default};
  ${({ theme }) => theme.typography.availableMedium12};

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  color: inherit;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Label = styled.span`
  color: inherit;
`;
