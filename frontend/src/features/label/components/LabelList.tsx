import styled from '@emotion/styled';
import LabelItem from './LabelItem';
import { type Label } from '../types';

interface Props {
  labels: Label[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isError?: boolean;
  isFetching?: boolean;
}

const EMPTY_LABEL_TEXT = '표시할 레이블이 없습니다';
const ERROR_TEXT = '문제가 발생했습니다. 잠시 후 다시 시도해주세요.';

export default function LabelList({
  labels,
  onEdit,
  onDelete,
  isError = false,
  isFetching = false,
}: Props) {
  const isEmpty = labels.length === 0;

  const renderContent = () => {
    if (isError) return <Message text={ERROR_TEXT} isError />;
    if (!isFetching && isEmpty) return <Message text={EMPTY_LABEL_TEXT} />;
    return labels.map(label => (
      <LabelItem
        key={label.id}
        label={label}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ));
  };

  return (
    <ContentWrapper isFetching={isFetching}>{renderContent()}</ContentWrapper>
  );
}

const ContentWrapper = styled.ul<{ isFetching?: boolean }>`
  display: flex;
  flex-direction: column;
  opacity: ${({ isFetching }) => (isFetching ? 0.5 : 1)};
  transition: opacity 0.5s ease-in-out;
  min-height: 96px;
`;

const Message = ({
  text,
  isError = false,
}: {
  text: string;
  isError?: boolean;
}) => <MessageItem isError={isError}>{text}</MessageItem>;

const MessageItem = styled.li<{ isError?: boolean }>`
  padding: 40px 0;
  text-align: center;
  color: ${({ isError, theme }) => (isError ? 'red' : theme.neutral.text.weak)};
  ${({ theme }) => theme.typography.availableMedium16};
`;
