import fetchWithAuth from '@/shared/utils/fetchWithAuth';

export interface PostLabelParams {
  name: string;
  color: string;
  description?: string;
}

export async function postLabel({ name, color, description }: PostLabelParams) {
  const body: Record<string, string> = { name, color };
  if (description && description.trim()) {
    body.description = description;
  }

  const response = await fetchWithAuth('/api/v1/labels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const statusCodeHandler: Record<number, () => Promise<void>> = {
    201: () => Promise.resolve(), // ✅ JSON 응답 없으니 바로 resolve
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
