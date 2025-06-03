import styled from '@emotion/styled';
import Button from '@/shared/components/Button';
import EditIcon from '@/assets/icons/edit.svg?react';

interface CommentEditActionButtonsProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}

export default function CommentEditActionButtons({
  onCancel,
  onSubmit,
  isSubmitDisabled,
}: CommentEditActionButtonsProps) {
  return (
    <ButtonGroupWrapper>
      <Button variant="outline" size="small" onClick={onCancel}>
        취소
      </Button>
      <Button
        size="small"
        icon={<EditIcon />}
        disabled={isSubmitDisabled}
        onClick={onSubmit}
      >
        편집 완료
      </Button>
    </ButtonGroupWrapper>
  );
}

const ButtonGroupWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 12px;
`;
