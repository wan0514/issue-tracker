import React from 'react';
import styled from '@emotion/styled';
import { formatCreatedMessage } from '@/features/issue/utils';
import AlertCircleIcon from '@/assets/icons/alertCircle.svg?react';

interface Props {
  isClosed: boolean;
  createdAt: string;
  authorName: string;
  commentCount: number;
}

function IssueMeta({ isClosed, createdAt, authorName, commentCount }: Props) {
  return (
    <IssueMetaWrapper>
      <IsClosedButton isClosed={isClosed}>
        <AlertCircleIcon />
        <StateBadge>{isClosed ? '닫힌 이슈' : '열린 이슈'}</StateBadge>
      </IsClosedButton>
      <MetaInfo>
        {formatCreatedMessage({ createdAt, author: authorName, isClosed })}
      </MetaInfo>
      <CommentCount>코멘트 {commentCount}개</CommentCount>
    </IssueMetaWrapper>
  );
}

export default React.memo(IssueMeta);

const IssueMetaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const MetaInfo = styled.span`
  color: ${({ theme }) => theme.neutral.text.weak};
  ${({ theme }) => theme.typography.displayMedium16};
`;

const CommentCount = styled.span`
  margin-left: 24px;
  color: ${({ theme }) => theme.neutral.text.weak};
  ${({ theme }) => theme.typography.displayMedium16};
`;

const IsClosedButton = styled.button<{ isClosed: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  background-color: ${({ theme, isClosed }) =>
    isClosed ? theme.palette.navy : theme.palette.blue};

  border-radius: ${({ theme }) => theme.radius.large};
  color: ${({ theme }) => theme.brand.text.default};

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const StateBadge = styled.span`
  padding: 0 4px;
  color: ${({ theme }) => theme.brand.text.default};
  ${({ theme }) => theme.typography.displayMedium12};
`;
