import { useParams } from 'react-router-dom';
import { usePatchIssueContent } from '@/features/issue/hooks/usePatchIssueContent';
import DescriptionBox from '@/features/issue/components/detail/DescriptionBox';
import { type CommentAuthor } from '@/features/issue/types/issue';

interface IssueDescriptionProps {
  content: string | null;
  author: CommentAuthor;
  createdAt: string;
}

export default function IssueDescription({
  content,
  author,
  createdAt,
}: IssueDescriptionProps) {
  const { id } = useParams();
  const issueId = Number(id);
  const { mutate } = usePatchIssueContent(issueId);

  const handleSubmit = (description: string) => {
    mutate({ issueId, content: description });
  };

  return (
    <DescriptionBox
      content={content}
      author={author}
      createdAt={createdAt}
      onSubmit={handleSubmit}
    />
  );
}
