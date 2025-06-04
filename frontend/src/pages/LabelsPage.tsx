import { useState } from 'react';
import styled from '@emotion/styled';
import { useLabels } from '@/features/label/hooks/useLabels';
import VerticalStack from '@/layouts/VerticalStack';
import LabelMilestoneTab from '@/shared/components/LabelMilestoneTab';
import AddLabelButton from '@/features/label/components/AddLabelButton';
import LabelListContainer from '@/features/label/components/LabelListContainer';

export default function LabelsPage() {
  const { labels, isFetching, isError, refetch } = useLabels();
  //TODO 생성 및 편집 모드 구현
  const [isCreating, setIsCreating] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setEditId(id);
    setIsCreating(false); // 편집 모드 진입 시 생성모드는 닫힘
  };

  const handleDelete = async (id: number) => {
    // TODO: deleteLabel API 호출
    console.log('Deleting label id:', id);
    await refetch();
  };

  return (
    <VerticalStack>
      <PageHeader>
        <LabelMilestoneTab labelCount={labels.length} milestoneCount={5} />
        <AddLabelButton
          onClick={() => {
            setIsCreating(true);
            setEditId(null);
          }}
        />
      </PageHeader>

      <LabelListContainer
        labels={labels}
        isFetching={isFetching}
        isError={isError}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </VerticalStack>
  );
}

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
