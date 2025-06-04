import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useFilterStore } from '@/store/useFilterStore';
import { useUsers } from '@/features/user/hooks/useUsers';
import enhanceOptions from '@/shared/utils/enhanceOptions';
import Dropdown from '@/shared/components/Dropdown';
import DropdownPanel from '@/shared/components/DropdownPanel';

export default function AuthorDropdown() {
  const { authorId, setAuthor } = useFilterStore();
  const { users } = useUsers();
  const [selected, setSelected] = useState<number | null>(authorId ?? null);
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운 닫힐 때만 반영
  useEffect(() => {
    if (!isOpen && selected !== authorId) {
      setAuthor(selected);
    }
  }, [isOpen]);

  const handleSelect = (id: number) => {
    setSelected(prev => (prev === id ? null : id));
  };

  const options = enhanceOptions(
    users.map(u => ({
      id: u.id,
      name: u.nickname,
      imageUrl: u.profileImage,
    })),
    selected,
  );

  return (
    <Dropdown label="작성자" isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownPanel<{ imageUrl: string }>
        options={options}
        onSelect={handleSelect}
        renderOption={option => (
          <UserInfo>
            <UserImage src={option.imageUrl} />
            <span>{option.name}</span>
          </UserInfo>
        )}
      />
    </Dropdown>
  );
}

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
`;
