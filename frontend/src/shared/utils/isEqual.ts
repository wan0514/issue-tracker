/**
 * 두 ID 배열이 같은 값들로 구성되어 있는지 확인합니다.
 *
 * - 요소의 순서는 무시합니다.
 * - 중복 요소가 없다고 가정합니다.
 *
 * @param prevIds 이전 상태의 ID 배열
 * @param nextIds 새로운 상태의 ID 배열
 * @returns 두 배열이 같은 ID 목록이면 true, 그렇지 않으면 false
 */
export function isSameIdArray(prevIds: number[], nextIds: number[]): boolean {
  if (prevIds.length !== nextIds.length) return false;

  const sortedPrev = [...prevIds].sort((a, b) => a - b);
  const sortedNext = [...nextIds].sort((a, b) => a - b);

  return sortedPrev.every((id, index) => id === sortedNext[index]);
}
