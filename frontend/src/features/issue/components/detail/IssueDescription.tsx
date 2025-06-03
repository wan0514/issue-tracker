import DescriptionBox, {
  type DescriptionBoxProps,
} from '@/features/issue/components/detail/DescriptionBox';

export default function IssueDescription(props: DescriptionBoxProps) {
  const handleSubmit = (description: string) => {
    // TODO 이슈 description 편집 로직
  };

  return <DescriptionBox {...props} onSubmit={handleSubmit} />;
}
