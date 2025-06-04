import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useFilterStore } from '@/store/useFilterStore';
import enhanceOptions from '@/shared/utils/enhanceOptions';
import Dropdown from '@/shared/components/Dropdown';
import DropdownPanel from '@/shared/components/DropdownPanel';
import { isSameIdArray } from '@/shared/utils/isEqual';
import { useLabels } from '@/features/label/hooks/useLabels';

export default function LabelDropdown() {
  const { labelIds, setLabelIds } = useFilterStore();
  const { labels } = useLabels();
  const [selected, setSelected] = useState<number[]>(labelIds);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen && !isSameIdArray(selected, labelIds)) {
      setLabelIds(selected);
    }
  }, [isOpen]);

  const toggle = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const options = enhanceOptions(labels, selected);

  return (
    <Dropdown label="레이블" isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownPanel<{ color: string }>
        options={options}
        onSelect={toggle}
        renderOption={option => (
          <LabelInfo>
            <ColorDot style={{ backgroundColor: option.color }} />
            <span>{option.name}</span>
          </LabelInfo>
        )}
      />
    </Dropdown>
  );
}

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
