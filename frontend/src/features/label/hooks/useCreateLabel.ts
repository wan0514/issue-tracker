import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLabel, type PostLabelParams } from '../api/postLabel';

export function useCreateLabel() {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PostLabelParams) => postLabel(params),
  });
}
