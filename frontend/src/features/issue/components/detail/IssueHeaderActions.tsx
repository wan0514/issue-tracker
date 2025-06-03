import styled from '@emotion/styled';
import Button from '@/shared/components/Button';
import EditIcon from '@/assets/icons/edit.svg?react';
import CheckIcon from '@/assets/icons/chevronDown.svg?react';
import XIcon from '@/assets/icons/xSquare.svg?react';
import ClosedIcon from '@/assets/icons/archive.svg?react';

interface Props {
  isEditing: boolean;
  onEditStart: () => void;
  onEditCancel: () => void;
  onEditSubmit: () => void;
  isClosed: boolean;
  onToggleIssueState: () => void;
  isSubmitDisabled: boolean;
}

export default function IssueHeaderActions({
  isEditing,
  onEditStart,
  onEditCancel,
  onEditSubmit,
  isClosed,
  onToggleIssueState,
  isSubmitDisabled,
}: Props) {
  return (
    <ButtonGroup>
      {isEditing ? (
        <>
          <Button
            variant="outline"
            size="small"
            icon={<XIcon />}
            onClick={onEditCancel}
          >
            편집 취소
          </Button>
          <Button
            variant="contained"
            size="small"
            icon={<CheckIcon />}
            onClick={onEditSubmit}
            disabled={isSubmitDisabled}
          >
            편집 완료
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outline"
            size="small"
            icon={<EditIcon />}
            onClick={onEditStart}
          >
            제목 편집
          </Button>
          <Button
            variant="outline"
            size="small"
            icon={<ClosedIcon />}
            onClick={onToggleIssueState}
          >
            {isClosed ? '이슈 열기' : '이슈 닫기'}
          </Button>
        </>
      )}
    </ButtonGroup>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
