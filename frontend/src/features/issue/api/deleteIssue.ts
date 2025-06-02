import { API } from '@/shared/constants/api';
import fetchWithAuth from '@/shared/utils/fetchWithAuth';

export default async function deleteIssue(id: number): Promise<void> {
  const response = await fetchWithAuth(`${API.ISSUES}/${id}`, {
    method: 'DELETE',
  });

  const statusCodeHandler: Record<number, () => Promise<void>> = {
    204: () => Promise.resolve(),
    401: () => {
      window.location.href = '/login';
      return Promise.reject(new Error('로그인이 필요합니다.'));
    },
    403: () => Promise.reject(new Error('삭제 권한이 없습니다.')),
    404: () => Promise.reject(new Error('존재하지 않는 이슈입니다.')),
    500: () => Promise.reject(new Error('서버 오류가 발생했습니다.')),
  };

  const defaultHandler = () =>
    Promise.reject(
      new Error(`예상치 못한 오류가 발생했습니다 (status: ${response.status})`),
    );

  return (statusCodeHandler[response.status] ?? defaultHandler)();
}
