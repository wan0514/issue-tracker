import { type NewIssueState } from '@/features/newIssue/types';
import { type Dispatch } from '@/features/newIssue/reducers/newIssueFormReducer';
import IssueSidebar from '@/shared/components/sidebar';
import { isSameIdArray } from '@/shared/utils/isEqual';

interface IssueCreateSidebarProps {
  state: NewIssueState;
  dispatch: Dispatch;
}

export default function IssueCreateSidebar({
  state,
  dispatch,
}: IssueCreateSidebarProps) {
  const handleSaveLabel = (incoming: number[]) => {
    if (isSameIdArray(incoming, state.labels)) return;
    incoming.forEach(id => {
      if (!state.labels.includes(id))
        dispatch({ type: 'TOGGLE_LABEL', payload: id });
    });
    state.labels.forEach(id => {
      if (!incoming.includes(id))
        dispatch({ type: 'TOGGLE_LABEL', payload: id });
    });
  };

  const handleSaveAssignee = (incoming: number[]) => {
    if (isSameIdArray(incoming, state.assignees)) return;
    incoming.forEach(id => {
      if (!state.assignees.includes(id))
        dispatch({ type: 'TOGGLE_ASSIGNEE', payload: id });
    });
    state.assignees.forEach(id => {
      if (!incoming.includes(id))
        dispatch({ type: 'TOGGLE_ASSIGNEE', payload: id });
    });
  };

  return (
    <IssueSidebar
      initialLabelIds={state.labels}
      onSaveLabel={handleSaveLabel}
      initialAssigneeIds={state.assignees}
      onSaveAssignee={handleSaveAssignee}
      initialMilestoneId={state.milestone}
      onSaveMilestone={id => dispatch({ type: 'SET_MILESTONE', payload: id })}
    />
  );
}
