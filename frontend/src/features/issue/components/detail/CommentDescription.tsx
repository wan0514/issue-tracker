import { useParams } from 'react-router-dom';
import { useUpdateComment } from '../../hooks/useUpdateComment';
import { type CommentAuthor } from '@/features/issue/types/issue';
import DescriptionBox from '@/features/issue/components/detail/DescriptionBox';

interface CommentDescriptionProps {
  content: string | null;
  author: CommentAuthor;
  createdAt: string;
  commentId: number;
}

export default function CommentDescription({
  content,
  author,
  createdAt,
  commentId,
}: CommentDescriptionProps) {
  const { id: issueId } = useParams();
  const { mutate } = useUpdateComment(Number(issueId));

  const handleSubmit = (description: string) => {
    mutate({ commentId, content: description });
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
