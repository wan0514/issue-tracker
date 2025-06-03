import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchIssueMilestone } from '../api/patchIssueMilestone';

export const usePatchIssueMilestone = (issueId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (milestoneId: number | null) =>
      patchIssueMilestone(issueId, milestoneId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['issue', issueId, 'milestone'],
      });
    },
  });
};
