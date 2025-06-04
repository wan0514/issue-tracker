import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useFilterStore } from '@/store/useFilterStore';
import { useUsers } from '@/features/user/hooks/useUsers';
import enhanceOptions from '@/shared/utils/enhanceOptions';
import { isSameIdArray } from '@/shared/utils/isEqual';
import Dropdown from '@/shared/components/Dropdown';
import DropdownPanel from '@/shared/components/DropdownPanel';

export default function AssigneeDropdown() {
  const { assigneeIds, setAssigneeIds } = useFilterStore();
  const { users } = useUsers();
  const [selected, setSelected] = useState<number[]>(assigneeIds);
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운이 닫힐 때 변경된 내용만 반영
  useEffect(() => {
    if (!isOpen && !isSameIdArray(selected, assigneeIds)) {
      setAssigneeIds(selected);
    }
  }, [isOpen]);

  const toggle = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
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
    <Dropdown label="담당자" isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownPanel<{ imageUrl: string }>
        options={options}
        onSelect={toggle}
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
