import { useMemo } from 'react';
import styled from '@emotion/styled';
import { getAccessibleLabelStyle } from '@/shared/utils/color';
import { type Label } from '../types';
import RandomIcon from '@/assets/icons/refreshCcw.svg?react';
import TextInput from '@/shared/components/TextInput';
import LabelFormActionButtons from './LabelFormActionButtons';
import LabelBadge from '@/shared/components/LabelBadge';

interface Props {
  mode: 'create' | 'edit';
  formState: {
    name: string;
    color: string;
    description: string;
  };
  onChangeFormState: (next: {
    name: string;
    color: string;
    description: string;
  }) => void;
  onCancel: () => void;
  onSubmit: (label: Partial<Label>) => void;
  isSubmitDisabled: boolean;
}

export default function LabelForm({
  mode,
  formState,
  onChangeFormState,
  onCancel,
  onSubmit,
  isSubmitDisabled,
}: Props) {
  const { name, color, description } = formState;

  const { textColor, borderColor } = useMemo(
    () => getAccessibleLabelStyle(color),
    [color],
  );

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name, color, description });
  };

  const handleRandomColor = () => {
    const random = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
    onChangeFormState({ ...formState, color: random.toUpperCase() });
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    if (/^#[0-9A-F]{0,6}$/.test(value)) {
      onChangeFormState({ ...formState, color: value });
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFormState({ ...formState, color: e.target.value.toUpperCase() });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 15) {
      onChangeFormState({ ...formState, name: value });
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFormState({ ...formState, description: e.target.value });
  };

  return (
    <FormWrapper>
      <PreviewArea>
        <LabelBadge
          name={name}
          color={color}
          textColor={textColor}
          borderColor={borderColor}
        />
      </PreviewArea>

      <FormContent>
        <TextInput
          label="이름"
          value={name}
          onChange={handleNameChange}
          placeholder="레이블의 이름을 입력하세요"
        />

        <TextInput
          label="설명(선택)"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="레이블에 대한 설명을 입력하세요"
        />

        <ColorFieldRow>
          <ColorLabel>배경 색상</ColorLabel>
          <ColorInput
            type="text"
            value={color.toUpperCase()}
            onChange={handleHexInputChange}
          />
          <ColorPicker
            type="color"
            value={/^#[0-9A-F]{6}$/.test(color) ? color : '#e2e2e2'}
            onChange={handleColorPickerChange}
          />
          <RandomButton type="button" onClick={handleRandomColor}>
            <RandomIcon />
          </RandomButton>
        </ColorFieldRow>

        <ButtonGroup>
          <LabelFormActionButtons
            mode={mode}
            onCancel={onCancel}
            onSubmit={handleSubmit}
            isSubmitDisabled={isSubmitDisabled}
          />
        </ButtonGroup>
      </FormContent>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  gap: 32px;
  padding: 32px;
  background-color: ${({ theme }) => theme.neutral.surface.strong};
  border-radius: ${({ theme }) => theme.radius.medium};
  border: 1px solid ${({ theme }) => theme.neutral.border.default};
`;

const PreviewArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  border-radius: 4px;
  width: 288px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid ${({ theme }) => theme.neutral.border.default};
`;

const FormContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ColorFieldRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: ${({ theme }) => theme.neutral.surface.bold};
`;

const ColorLabel = styled.span`
  width: 64px;
  color: ${({ theme }) => theme.neutral.text.weak};
  ${({ theme }) => theme.typography.displayMedium12};
`;

const ColorInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.neutral.text.strong};
  ${({ theme }) => theme.typography.displayMedium16};

  &:focus {
    outline: none;
  }
`;

const ColorPicker = styled.input`
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;
`;

const RandomButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;
