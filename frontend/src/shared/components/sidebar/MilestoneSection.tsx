import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import type { MilestoneDetail } from '@/features/milestone/types';
import useMilestones from '@/features/milestone/hooks/useMilestones';
import Dropdown from '@/shared/components/Dropdown';
import DropdownPanel from '@/shared/components/DropdownPanel';
import MilestoneProgressBar from '@/shared/components/MilestoneProgressBar';

interface MilestoneSectionProps {
  initialSelectedId: number | null;
  onSave: (id: number | null) => void;
}

export default function MilestoneSection({
  initialSelectedId,
  onSave,
}: MilestoneSectionProps) {
  const { milestones } = useMilestones();
  const [selectedId, setSelectedId] = useState<number | null>(
    initialSelectedId,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectMilestone = (id: number) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  const milestoneOptions = milestones.map((milestone: MilestoneDetail) => ({
    id: milestone.id,
    name: milestone.title,
    progressRate: milestone.progressRate,
    selected: selectedId === milestone.id,
  }));

  const selectedMilestone = milestones.find(
    (milestone: MilestoneDetail) => selectedId === milestone.id,
  );

  useEffect(() => {
    if (!isOpen && selectedId !== initialSelectedId) {
      onSave(selectedId);
    }
  }, [isOpen]);

  return (
    <Section>
      <Dropdown label="마일스톤" isOpen={isOpen} setIsOpen={setIsOpen}>
        <DropdownPanel<{ progressRate: number }>
          options={milestoneOptions}
          onSelect={handleSelectMilestone}
          renderOption={option => <span>{option.name}</span>}
        />
      </Dropdown>

      {selectedMilestone && (
        <SectionList>
          <MilestoneProgressBar percentage={selectedMilestone.progressRate}>
            <MilestoneLabel>{selectedMilestone.title}</MilestoneLabel>
          </MilestoneProgressBar>
        </SectionList>
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

const SectionList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${({ theme }) => theme.typography.availableMedium12};
  color: ${({ theme }) => theme.neutral.text.strong};
`;

const MilestoneLabel = styled.span`
  ${({ theme }) => theme.typography.displayMedium12};
  color: ${({ theme }) => theme.neutral.text.strong};
`;
