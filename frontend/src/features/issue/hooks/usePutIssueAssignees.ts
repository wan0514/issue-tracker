import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putIssueAssignees } from '@/features/issue/api/putIssueAssignees';

export const usePutIssueAssignees = (issueId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assigneeIds: number[]) =>
      putIssueAssignees(issueId, assigneeIds),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['issue', issueId, 'assignees'],
      });
    },
  });
};
