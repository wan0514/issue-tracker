import Button from '@/shared/components/Button';
import PlusIcon from '@/assets/icons/plus.svg?react';

interface Props {
  onClick: () => void;
}

export default function AddLabelButton({ onClick }: Props) {
  return (
    <Button size="small" icon={<PlusIcon />} onClick={onClick}>
      레이블 추가
    </Button>
  );
}
