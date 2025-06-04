import { useEffect, useState } from 'react';
import { useFilterStore } from '@/store/useFilterStore';
import useMilestoneShort from '@/features/milestone/hooks/useMilestoneShort';
import enhanceOptions from '@/shared/utils/enhanceOptions';
import Dropdown from '@/shared/components/Dropdown';
import DropdownPanel from '@/shared/components/DropdownPanel';

export default function MilestoneDropdown() {
  const { milestoneId, setMilestone } = useFilterStore();
  const { milestones } = useMilestoneShort();
  const [selected, setSelected] = useState<number | null>(milestoneId ?? null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen && selected !== milestoneId) {
      setMilestone(selected);
    }
  }, [isOpen]);

  const handleSelect = (id: number) => {
    setSelected(prev => (prev === id ? null : id));
  };

  const options = enhanceOptions(
    milestones.map(m => ({ id: m.id, name: m.title })),
    selected,
  );

  return (
    <Dropdown label="마엘스톤" isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownPanel
        options={options}
        onSelect={handleSelect}
        renderOption={option => <span>{option.name}</span>}
      />
    </Dropdown>
  );
}
