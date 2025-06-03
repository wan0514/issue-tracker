import styled from '@emotion/styled';
import { type NewIssueState } from '@/features/newIssue/types';
import { type Dispatch } from '@/features/newIssue/reducers/newIssueFormReducer';
import Profile from '@/shared/components/Profile';
import IssueForm from '@/features/newIssue/components/NewIssueForm';
import IssueCreateSidebar from '@/features/newIssue/components/IssueCreateSidebar';

interface NewIssueFormSectionProps {
  state: NewIssueState;
  dispatch: Dispatch;
}

export default function NewIssueFormSection({
  state,
  dispatch,
}: NewIssueFormSectionProps) {
  const handleTitleChange = (value: string) => {
    dispatch({ type: 'SET_TITLE', payload: value });
  };

  const handleContentChange = (value: string | ((prev: string) => string)) => {
    dispatch({ type: 'SET_CONTENT', payload: value });
  };

  return (
    <MainWrapper>
      <Profile size="md" />
      <IssueForm
        title={state.title}
        content={state.content}
        onTitleChange={handleTitleChange}
        onContentChange={handleContentChange}
      />
      <IssueCreateSidebar state={state} dispatch={dispatch} />
    </MainWrapper>
  );
}

const MainWrapper = styled.main`
  display: flex;
  align-items: flex-start;
  gap: 24px;
`;
