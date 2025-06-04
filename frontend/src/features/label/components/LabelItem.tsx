import styled from '@emotion/styled';
import Button from '@/shared/components/Button';
import LabelBadge from '@/shared/components/LabelBadge';
import { getAccessibleLabelStyle } from '@/shared/utils/color';
import { type Label } from '../types';
import TrashIcon from '@/assets/icons/trash.svg?react';
import EditIcon from '@/assets/icons/edit.svg?react';

interface Props {
  label: Label;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function LabelItem({ label, onEdit, onDelete }: Props) {
  const { id, name, description, color } = label;
  const { textColor, borderColor } = getAccessibleLabelStyle(color);

  return (
    <ItemContainer>
      <LeftContent>
        <LabelCell>
          <LabelBadge
            name={name}
            color={color}
            textColor={textColor}
            borderColor={borderColor}
          />
        </LabelCell>
        {description && <Description>{description}</Description>}
      </LeftContent>

      <ButtonGroup>
        <Button
          variant="ghost"
          size="small"
          icon={<EditIcon />}
          onClick={() => onEdit(id)}
        >
          편집
        </Button>
        <Button
          variant="ghost"
          size="small"
          icon={<TrashIcon />}
          onClick={() => onDelete(id)}
        >
          삭제
        </Button>
      </ButtonGroup>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  padding: 36px 32px;
  background-color: ${({ theme }) => theme.neutral.surface.strong};
  border-bottom: 1px solid ${({ theme }) => theme.neutral.border.default};

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.neutral.surface.default};
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 24px;
  min-width: 0;
`;

const LabelCell = styled.div`
  display: flex;
  width: 176px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.div`
  flex: 1;
  min-width: 0;
  color: ${({ theme }) => theme.neutral.text.weak};
  ${({ theme }) => theme.typography.displayMedium16};
  word-break: break-word;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;
