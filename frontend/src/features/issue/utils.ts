import { type IssueQueryFilterState } from '@/features/issue/types/issue';

interface CreatedMessageParams {
  createdAt: string;
  author: string;
  isClosed: boolean;
}

/**
 * 이슈의 생성 시간과 작성자 이름, 상태를 받아
 * "몇 분/시간/일 전, 누가 열었는지/닫았는지" 형태의 문자열을 반환합니다.
 *
 * @param {string} createdAt - 이슈 생성 시간 (ISO 8601 문자열)
 * @param {string} author - 작성자 이름
 * @param {boolean} isClosed - 이슈 상태 (true: 닫힘, false: 열림)
 * @returns {string} 메시지 문자열
 *
 * @example
 * // '3시간 전, 홍길동님에 의해 열렸습니다.'
 * formatCreatedMessage('2025-05-13T11:00:00Z', '홍길동', false);
 */
export function formatCreatedMessage({
  createdAt,
  author,
  isClosed,
}: CreatedMessageParams) {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now.getTime() - created.getTime();
  const diffMinutes = Math.floor(diffMs / 1000 / 60);

  let timeString = '';

  if (diffMinutes < 1) {
    timeString = '방금';
  } else if (diffMinutes < 60) {
    timeString = `${diffMinutes}분 전`;
  } else if (diffMinutes < 60 * 24) {
    const diffHours = Math.floor(diffMinutes / 60);
    timeString = `${diffHours}시간 전`;
  } else {
    const diffDays = Math.floor(diffMinutes / 60 / 24);
    timeString = `${diffDays}일 전`;
  }

  const statusText = isClosed ? '닫혔습니다' : '열렸습니다';

  return `이 이슈가 ${timeString}에 ${author}님에 의해 ${statusText}`;
}

/**
 * 필터 상태 객체를 기반으로 GitHub 스타일의 이슈 쿼리 문자열을 생성합니다.
 * 쿼리 문자열은 'is:issue'로 시작하며, 선택된 상태, 라벨, 작성자, 담당자, 마일스톤 조건이 순차적으로 추가됩니다.
 * 각 필드는 ID 기반으로 받아와 해당하는 name/title/nickname으로 변환되어 쿼리에 포함됩니다.
 *
 * @param {IssueQueryFilterState} 필터 상태와 관련된 데이터 객체
 *  - state: 이슈 상태(open 또는 closed)
 *  - labelIds: 선택된 라벨 ID 목록
 *  - assigneeIds: 선택된 담당자 ID 목록
 *  - authorId: 선택된 작성자 ID (또는 null)
 *  - milestoneId: 선택된 마일스톤 ID (또는 null)
 *  - users: 사용자 목록 (id, nickname 포함)
 *  - labels: 라벨 목록 (id, name 포함)
 *  - milestones: 마일스톤 목록 (id, title 포함)
 *
 * @returns {string} 조합된 쿼리 문자열 (예: 'is:issue state:open label:"버그" author:sunwon')
 *
 * @example
 * buildIssueQueryFromFilter({
 *   state: 'open',
 *   labelIds: [1],
 *   assigneeIds: [2],
 *   authorId: 3,
 *   milestoneId: 4,
 *   users: [{ id: 2, nickname: 'sunwon' }, { id: 3, nickname: 'dev-angel' }],
 *   labels: [{ id: 1, name: '버그' }],
 *   milestones: [{ id: 4, title: '이번 주까지' }]
 * });
 * // 결과: 'is:issue state:open label:"버그" assignee:sunwon author:dev-angel milestone:"이번 주까지"'
 */
export function buildIssueQueryFromFilter({
  state,
  labelIds,
  assigneeIds,
  authorId,
  milestoneId,
  users,
  labels,
  milestones,
}: IssueQueryFilterState): string {
  const queries: string[] = ['is:issue'];

  if (state) queries.push(`state:${state}`);

  labelIds.forEach(id => {
    const name = labels.find(l => l.id === id)?.name;
    if (name) queries.push(`label:${wrap(name)}`);
  });

  assigneeIds.forEach(id => {
    const nick = users.find(u => u.id === id)?.nickname;
    if (nick) queries.push(`assignee:${wrap(nick)}`);
  });

  if (authorId !== null) {
    const nick = users.find(u => u.id === authorId)?.nickname;
    if (nick) queries.push(`author:${wrap(nick)}`);
  }

  if (milestoneId !== null) {
    const title = milestones.find(m => m.id === milestoneId)?.title;
    if (title) queries.push(`milestone:${wrap(title)}`);
  }

  return queries.join(' ');
}

function wrap(value: string): string {
  return /\s/.test(value) ? `"${value}"` : value;
}
