import { useMutation } from '@tanstack/react-query';
import deleteLabel from '@/features/label/api/deleteLabel';

export function useDeleteLabel() {
  return useMutation({
    mutationFn: (id: number) => deleteLabel(id),
  });
}
