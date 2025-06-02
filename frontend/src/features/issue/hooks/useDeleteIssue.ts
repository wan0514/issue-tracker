import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import deleteIssue from '../api/deleteIssue';

export function useDeleteIssue() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteIssue,
    onSuccess: () => {
      navigate('/');
    },
  });
}
