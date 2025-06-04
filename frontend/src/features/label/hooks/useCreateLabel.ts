import { useMutation } from '@tanstack/react-query';
import { postLabel, type PostLabelParams } from '../api/postLabel';

export function useCreateLabel() {
  return useMutation({
    mutationFn: (params: PostLabelParams) => postLabel(params),
  });
}
