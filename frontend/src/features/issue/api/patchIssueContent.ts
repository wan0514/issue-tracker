import { API } from '@/shared/constants/api';
import fetchWithAuth from '@/shared/utils/fetchWithAuth';
import { type PatchIssueContentParams } from '@/features/issue/types/issue';

export async function patchIssueContent({
  issueId,
  content,
}: PatchIssueContentParams): Promise<void> {
  const res = await fetchWithAuth(API.ISSUE_CONTENT(issueId), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });

  const statusCodeHandler: Record<number, () => Promise<void>> = {
    204: async () => {},
    401: () => {
      window.location.href = '/login';
      return Promise.reject(new Error('로그인이 필요합니다'));
    },
    404: () => Promise.reject(new Error('요청한 이슈가 존재하지 않습니다')),
    500: () => Promise.reject(new Error('서버 오류가 발생했습니다')),
  };

  const defaultHandler = () =>
    Promise.reject(
      new Error(`예상치 못한 오류가 발생했습니다 (status: ${res.status})`),
    );

  return (statusCodeHandler[res.status] ?? defaultHandler)();
}
