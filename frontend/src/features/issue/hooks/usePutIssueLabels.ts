import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putIssueLabels } from '@/features/issue/api/putIssueLabels';

export const usePutIssueLabels = (issueId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (labelIds: number[]) => putIssueLabels(issueId, labelIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issue', issueId, 'labels'] });
    },
  });
};
