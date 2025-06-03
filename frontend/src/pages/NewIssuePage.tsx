import { useNavigate } from 'react-router-dom';
import { useNewIssueForm } from '@/features/newIssue/hooks/useNewIssueForm';
import { useCreateIssue } from '@/features/newIssue/hooks/useCreateIssue';
import { buildIssuePayload } from '@/features/newIssue/utils';
import VerticalStack from '@/layouts/VerticalStack';
import Divider from '@/shared/components/Divider';
import NewIssueActionButtons from '@/features/newIssue/components/NewIssueActionButtons';
import NewIssueHeader from '@/features/newIssue/components/NewIssueHeader';
import NewIssueFormSection from '@/features/newIssue/components/NewIssueFormSection';

export default function NewIssuePage() {
  const navigate = useNavigate();
  const { state: issueForm, dispatch: updateIssueForm } = useNewIssueForm();
  const { mutate: postNewIssue } = useCreateIssue();

  function handleCancel() {
    updateIssueForm({ type: 'RESET_FORM' });
    navigate('/');
  }

  function isTitleEmpty(title: string) {
    return title.trim() === '';
  }

  function handleCreateIssue() {
    const payload = buildIssuePayload(issueForm);
    console.log('[POST] /api/v1/issues payload:', payload);
    postNewIssue(payload);
  }

  return (
    <VerticalStack>
      <NewIssueHeader />
      <Divider />
      <NewIssueFormSection state={issueForm} dispatch={updateIssueForm} />
      <Divider />
      <NewIssueActionButtons
        isSubmitDisabled={isTitleEmpty(issueForm.title)}
        onSubmit={handleCreateIssue}
        onCancel={handleCancel}
      />
    </VerticalStack>
  );
}
