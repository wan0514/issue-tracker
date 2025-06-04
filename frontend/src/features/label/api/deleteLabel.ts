import { API } from '@/shared/constants/api';
import fetchWithAuth from '@/shared/utils/fetchWithAuth';

export default async function deleteLabel(id: number): Promise<void> {
  const res = await fetchWithAuth(`${API.LABELS}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete label');
  }
}
