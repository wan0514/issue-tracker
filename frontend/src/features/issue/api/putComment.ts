import { API } from '@/shared/constants/api';
import fetchWithAuth from '@/shared/utils/fetchWithAuth';
import { type PutCommentParams } from '@/features/issue/types/comment';

export default async function PutComment({
  issueId,
  commentId,
  content,
}: PutCommentParams): Promise<void> {
  const response = await fetchWithAuth(API.ISSUE_COMMENT(issueId, commentId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    switch (response.status) {
      case 401:
        window.location.href = '/login';
        break;
      case 403:
        throw new Error('댓글을 수정할 권한이 없습니다.');
      case 404:
        throw new Error('댓글을 찾을 수 없습니다.');
      default:
        throw new Error('댓글 수정 중 오류가 발생했습니다.');
    }
  }
}
