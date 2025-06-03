import { useMutation, useQueryClient } from '@tanstack/react-query';
import PutComment from '@/features/issue/api/putComment';
import { type PutCommentParams } from '@/features/issue/types/comment';

export function useUpdateComment(issueId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: Omit<PutCommentParams, 'issueId'>) =>
      PutComment({ issueId, commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issueComments', issueId] });
    },
  });
}
