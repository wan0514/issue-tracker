import { useQuery, keepPreviousData } from '@tanstack/react-query';
import getLabels from '@/features/label/api/getLabels';
import { type GetLabelsResponse } from '@/features/label/types';

export function useLabels() {
  const { data, isLoading, isError, isFetching, refetch } =
    useQuery<GetLabelsResponse>({
      queryKey: ['labels'],
      queryFn: getLabels,
      placeholderData: keepPreviousData,
    });

  return {
    labels: data?.labels ?? [],
    isLoading,
    isFetching,
    isError,
    refetch,
  };
}
