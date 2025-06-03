import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchIssueTitle } from '../api/patchIssueTitle';

export default function usePatchIssueTitle(issueId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTitle: string) =>
      patchIssueTitle({ issueId, title: newTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issueDetail', issueId] });
    },
  });
}
