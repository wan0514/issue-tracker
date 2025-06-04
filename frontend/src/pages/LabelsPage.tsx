import { useState } from 'react';
import styled from '@emotion/styled';
import { useLabels } from '@/features/label/hooks/useLabels';
import { useCreateLabel } from '@/features/label/hooks/useCreateLabel';
import { usePatchLabel } from '@/features/label/hooks/usePatchLabel';
import VerticalStack from '@/layouts/VerticalStack';
import LabelMilestoneTab from '@/shared/components/LabelMilestoneTab';
import AddLabelButton from '@/features/label/components/AddLabelButton';
import LabelListContainer from '@/features/label/components/LabelListContainer';
import LabelForm from '@/features/label/components/LabelForm';
import { type Label } from '@/features/label/types';
import { useDeleteLabel } from '@/features/label/hooks/useDeleteLabel';

export default function LabelsPage() {
  const { labels, isFetching, isError, refetch } = useLabels();
  const { mutateAsync: createLabel } = useCreateLabel();
  const { mutateAsync: updateLabel } = usePatchLabel();
  const { mutateAsync: deleteLabel } = useDeleteLabel();
  const [isCreating, setIsCreating] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    name: 'label',
    color: '#6E6E6E',
    description: '',
  });

  const isCreateSubmitDisabled =
    !formState.name.trim() || !formState.color.trim();

  const targetLabel = labels.find(l => l.id === editId);

  const isEditSubmitDisabled = targetLabel
    ? targetLabel.name === formState.name &&
      targetLabel.color === formState.color &&
      (targetLabel.description || '') === (formState.description || '')
    : true;

  const resetFormState = () => {
    setFormState({
      name: 'label',
      color: '#6E6E6E',
      description: '',
    });
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditId(null);
  };

  const handleStartEdit = (id: number) => {
    setEditId(id);
    setIsCreating(false);
  };

  const handleCancelForm = () => {
    setIsCreating(false);
    setEditId(null);
  };

  const handleCreateSubmit = async (label: Partial<Label>) => {
    const { name, color, description } = label;

    const payload: {
      name: string;
      color: string;
      description?: string;
    } = {
      name: name!,
      color: color!,
    };

    if (description && description.trim()) {
      payload.description = description;
    }

    await createLabel(payload);
    await refetch();
    resetFormState();
    setIsCreating(false);
  };

  const handleEditSubmit = async (label: Partial<Label>) => {
    if (editId === null) return;

    const payload: {
      id: number;
      name: string;
      color: string;
      description?: string;
    } = {
      id: editId,
      name: label.name!,
      color: label.color!,
    };

    if (label.description && label.description.trim()) {
      payload.description = label.description;
    }

    await updateLabel(payload);
    await refetch();
    resetFormState();
    setEditId(null);
  };

  const handleDelete = async (id: number) => {
    await deleteLabel(id);
    await refetch();
  };

  return (
    <VerticalStack>
      <PageHeader>
        <LabelMilestoneTab labelCount={labels.length} milestoneCount={5} />
        <AddLabelButton onClick={handleStartCreate} />
      </PageHeader>

      {isCreating && (
        <LabelForm
          mode="create"
          formState={formState}
          onChangeFormState={setFormState}
          onCancel={handleCancelForm}
          onSubmit={handleCreateSubmit}
          isSubmitDisabled={isCreateSubmitDisabled}
        />
      )}

      {editId !== null && (
        <LabelForm
          mode="edit"
          formState={formState}
          onChangeFormState={setFormState}
          onCancel={handleCancelForm}
          onSubmit={handleEditSubmit}
          isSubmitDisabled={isEditSubmitDisabled}
        />
      )}
      <LabelListContainer
        labels={labels}
        isFetching={isFetching}
        isError={isError}
        onEdit={handleStartEdit}
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
