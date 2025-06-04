import styled from '@emotion/styled';
import LabelList from './LabelList';
import { type Label } from '../types';

interface LabelListContainerProps {
  labels: Label[];
  isFetching: boolean;
  isError: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function LabelListContainer({
  labels,
  isFetching,
  isError,
  onEdit,
  onDelete,
}: LabelListContainerProps) {
  if (isError) {
    return <div>레이블을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <Container>
      <Header>전체 레이블 {labels.length}개</Header>
      <LabelList
        labels={labels}
        onEdit={onEdit}
        onDelete={onDelete}
        isFetching={isFetching}
      />
    </Container>
  );
}

const Container = styled.section`
  border: 1px solid ${({ theme }) => theme.neutral.border.default};
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: ${({ theme }) => theme.neutral.surface.default};
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 32px;

  border-bottom: 1px solid ${({ theme }) => theme.neutral.border.default};
  background-color: ${({ theme }) => theme.neutral.surface.default};
  color: ${({ theme }) => theme.neutral.text.default};
  ${({ theme }) => theme.typography.displayBold16};
`;
