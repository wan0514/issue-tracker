import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLabels } from '@/features/label/hooks/useLabels';
import { type Label } from '@/features/label/types';
import LabelBadgeList from '@/shared/components/LabelBadgeList';
import Dropdown from '@/shared/components/Dropdown';
import DropdownPanel from '@/shared/components/DropdownPanel';
import { isSameIdArray } from '@/shared/utils/isEqual';

interface LabelSectionProps {
  initialSelectedIds: number[];
  onSave: (ids: number[]) => void;
}

export default function LabelSection({
  initialSelectedIds,
  onSave,
}: LabelSectionProps) {
  const { labels } = useLabels();
  const [selected, setSelected] = useState(initialSelectedIds);
  const [isOpen, setIsOpen] = useState(false);

  const toggleLabel = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  // 닫힐 때만 변경 사항이 있으면 onSave
  useEffect(() => {
    if (!isOpen && !isSameIdArray(selected, initialSelectedIds)) {
      onSave(selected);
    }
  }, [isOpen]);

  const labelOptions = labels.map((label: Label) => ({
    id: label.id,
    name: label.name,
    color: label.color,
    selected: selected.includes(label.id),
  }));

  const selectedLabels = labels.filter(label => selected.includes(label.id));

  return (
    <Section>
      <Dropdown label="레이블" isOpen={isOpen} setIsOpen={setIsOpen}>
        <DropdownPanel<{ color: string }>
          options={labelOptions}
          onSelect={toggleLabel}
          renderOption={option => (
            <LabelInfo>
              <ColorDot style={{ backgroundColor: option.color }} />
              <span>{option.name}</span>
            </LabelInfo>
          )}
        />
      </Dropdown>

      {selected.length > 0 && (
        <LabelList>
          <LabelBadgeList labels={selectedLabels} />
        </LabelList>
      )}
    </Section>
  );
}

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
`;

const LabelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ColorDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;

const LabelList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;

  ${({ theme }) => theme.typography.availableMedium12};
  color: ${({ theme }) => theme.neutral.text.strong};
`;
