const API_VERSION = '/api/v1';

export const API_BASE_URL = `${API_VERSION}`;

export const API = {
  ISSUES: `${API_BASE_URL}/issues`,
  POST_ISSUE: `${API_BASE_URL}/issues`,
  ISSUE_DETAIL: (id: number) => `${API_BASE_URL}/issues/${id}`,
  ISSUE_LABELS: (id: number) => `${API_BASE_URL}/issues/${id}/labels`,
  ISSUE_ASSIGNEES: (id: number) => `${API_BASE_URL}/issues/${id}/assignees`,
  ISSUE_MILESTONE: (id: number) => `${API_BASE_URL}/issues/${id}/milestone`,
  ISSUE_COMMENT: (issueId: number, commentId: number) =>
    `${API_BASE_URL}/issues/${issueId}/comments/${commentId}`,

  ISSUE_STATE: (id: number) => `${API_BASE_URL}/issues/${id}/state`,
  ISSUE_CONTENT: (id: number) => `${API_BASE_URL}/issues/${id}/content`,
  ISSUE_TITLE: (id: number) => `${API_BASE_URL}/issues/${id}/title`,

  LABELS: `${API_BASE_URL}/labels`,
  MILESTONES: `${API_BASE_URL}/milestones`,
  MILESTONES_SHORT: `${API_BASE_URL}/milestones/short`,
  USERS: `${API_BASE_URL}/users`,
  S3_PRESIGNED_URL: '/api/s3/presigned-url',

  OAUTH_LOGIN: `${API_BASE_URL}/auth/oauth/github`,
};
