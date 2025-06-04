import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchLabel, type PatchLabelParams } from '../api/patchLabel';

export function usePatchLabel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PatchLabelParams) => patchLabel(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labels'] });
    },
  });
}
