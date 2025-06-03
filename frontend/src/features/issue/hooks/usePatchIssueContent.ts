import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchIssueContent } from '../api/patchIssueContent';
import { type PatchIssueContentParams } from '@/features/issue/types/issue';

export function usePatchIssueContent(issueId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PatchIssueContentParams) => patchIssueContent(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issueDetail', issueId] });
    },
  });
}
