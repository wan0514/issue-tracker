import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useUsers } from '@/features/user/hooks/useUsers';
import { type User } from '@/features/user/types';
import Profile from '@/shared/components/Profile';
import Dropdown from '@/shared/components/Dropdown';
import DropdownPanel from '@/shared/components/DropdownPanel';
import { isSameIdArray } from '@/shared/utils/isEqual';

interface AssigneeSectionProps {
  initialSelectedIds: number[];
  onSave: (ids: number[]) => void;
}

export default function AssigneeSection({
  initialSelectedIds,
  onSave,
}: AssigneeSectionProps) {
  const { users } = useUsers();
  const [selected, setSelected] = useState(initialSelectedIds);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAssignee = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  // 드롭다운이 닫히는 순간에 변경되었으면 저장
  useEffect(() => {
    if (!isOpen && !isSameIdArray(selected, initialSelectedIds)) {
      onSave(selected);
    }
  }, [isOpen]);

  const assigneeOptions = users.map((user: User) => ({
    id: user.id,
    name: user.nickname,
    imageUrl: user.profileImage,
    selected: selected.includes(user.id),
  }));

  const selectedAssignees = users.filter(user => selected.includes(user.id));

  return (
    <Section>
      <Dropdown label="담당자" isOpen={isOpen} setIsOpen={setIsOpen}>
        <DropdownPanel<{ imageUrl: string }>
          options={assigneeOptions}
          onSelect={toggleAssignee}
          renderOption={option => (
            <UserInfo>
              <UserImage src={option.imageUrl} />
              <span>{option.name}</span>
            </UserInfo>
          )}
        />
      </Dropdown>
      {selected.length > 0 && (
        <SectionList>
          {selectedAssignees.map(assignee => (
            <Profile
              key={assignee.id}
              size="sm"
              name={assignee.nickname}
              imageUrl={assignee.profileImage}
            />
          ))}
        </SectionList>
      )}
    </Section>
  );
}

const Section = styled.div<{ noDivider?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
`;

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

const SectionList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${({ theme }) => theme.typography.availableMedium12};
  color: ${({ theme }) => theme.neutral.text.strong};
`;
