import { API } from '@/shared/constants/api';
import fetchWithAuth from '@/shared/utils/fetchWithAuth';

export default async function postComment(
  issueId: number,
  content: string,
): Promise<void> {
  const response = await fetchWithAuth(`${API.ISSUES}/${issueId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  const statusCodeHandler: Record<number, () => Promise<void>> = {
    201: () => Promise.resolve(),
    401: () => {
      window.location.href = '/login';
      return Promise.reject(new Error('로그인이 필요합니다'));
    },
    404: () => Promise.reject(new Error('요청 경로가 잘못되었습니다')),
    500: () => Promise.reject(new Error('서버 오류가 발생했습니다')),
  };

  const defaultHandler = () =>
    Promise.reject(
      new Error(`예상치 못한 오류가 발생했습니다 (status: ${response.status})`),
    );

  return (statusCodeHandler[response.status] ?? defaultHandler)();
}
