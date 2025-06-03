import styled from '@emotion/styled';
import AssigneeSection from '@/shared/components/sidebar/AssigneeSection';
import LabelSection from '@/shared/components/sidebar/LabelSection';
import MilestoneSection from '@/shared/components/sidebar/MilestoneSection';

interface IssueSidebarProps {
  initialAssigneeIds: number[];
  onSaveAssignee: (ids: number[]) => void;

  initialLabelIds: number[];
  onSaveLabel: (ids: number[]) => void;

  initialMilestoneId: number | null;
  onSaveMilestone: (id: number | null) => void;
}

export default function IssueSidebar({
  initialAssigneeIds,
  onSaveAssignee,
  initialLabelIds,
  onSaveLabel,
  initialMilestoneId,
  onSaveMilestone,
}: IssueSidebarProps) {
  return (
    <SidebarWrapper>
      <AssigneeSection
        initialSelectedIds={initialAssigneeIds}
        onSave={onSaveAssignee}
      />

      <LabelSection initialSelectedIds={initialLabelIds} onSave={onSaveLabel} />

      <MilestoneSection
        initialSelectedId={initialMilestoneId}
        onSave={onSaveMilestone}
      />
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.div`
  width: 288px;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius.medium};
  border: 1px solid ${({ theme }) => theme.neutral.border.default};
  background-color: ${({ theme }) => theme.neutral.surface.strong};

  overflow: hidden;

  & > *:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.neutral.border.default};
  }
`;
