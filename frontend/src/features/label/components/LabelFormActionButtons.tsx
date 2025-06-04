import styled from '@emotion/styled';
import Button from '@/shared/components/Button';
import EditIcon from '@/assets/icons/edit.svg?react';

interface LabelFormActionButtonsProps {
  mode: 'create' | 'edit';
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}

export default function LabelFormActionButtons({
  mode,
  onCancel,
  onSubmit,
  isSubmitDisabled,
}: LabelFormActionButtonsProps) {
  const cancelText = mode === 'create' ? '생성 취소' : '편집 취소';
  const submitText = mode === 'create' ? '생성 완료' : '편집 완료';

  return (
    <ButtonGroupWrapper>
      <Button variant="outline" size="small" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button
        size="small"
        icon={<EditIcon />}
        disabled={isSubmitDisabled}
        onClick={onSubmit}
      >
        {submitText}
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
