import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import fetchWithAuth from '@/shared/utils/fetchWithAuth';
import VerticalStack from '@/layouts/VerticalStack';
import LabelMilestoneTab from '@/shared/components/LabelMilestoneTab';
import MilestoneProgressBar from '@/shared/components/MilestoneProgressBar';

interface Milestone {
  id: number;
  title: string;
  description: string | null;
  expiredAt: string | null;
  isClosed: boolean;
  totalIssueCount: number;
  closedIssueCount: number;
}

interface CreateMilestoneRequest {
  title: string;
  expiredAt?: string;
  description?: string;
}

interface UpdateMilestoneRequest {
  title: string;
  expiredAt?: string;
  description?: string;
}

export default function MilestonesPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'open' | 'closed'>('open');
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [formData, setFormData] = useState<CreateMilestoneRequest>({
    title: '',
    description: '',
    expiredAt: '',
  });

  const fetchMilestones = async () => {
    try {
      setIsLoading(true);
      const response = await fetchWithAuth('/api/v1/milestones');
      if (!response.ok) {
        throw new Error('마일스톤을 불러오는데 실패했습니다.');
      }
      const data = await response.json();
      setMilestones(data.milestones);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const createMilestone = async (milestoneData: CreateMilestoneRequest) => {
    try {
      const response = await fetchWithAuth('/api/v1/milestones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(milestoneData),
      });

      if (!response.ok) {
        throw new Error('마일스톤 생성에 실패했습니다.');
      }

      await fetchMilestones();
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.');
    }
  };

  const updateMilestone = async (id: number, milestoneData: UpdateMilestoneRequest) => {
    try {
      const response = await fetchWithAuth(`/api/v1/milestones/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(milestoneData),
      });

      if (!response.ok) {
        throw new Error('마일스톤 수정에 실패했습니다.');
      }

      await fetchMilestones();
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.');
    }
  };

  const deleteMilestone = async (id: number) => {
    try {
      const response = await fetchWithAuth(`/api/v1/milestones/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('마일스톤 삭제에 실패했습니다.');
      }

      await fetchMilestones();
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.');
    }
  };

  const updateMilestoneState = async (id: number, targetClosed: boolean) => {
    try {
      const response = await fetchWithAuth(`/api/v1/milestones/${id}/state`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ targetClosed }),
      });

      if (!response.ok) {
        throw new Error('마일스톤 상태 변경에 실패했습니다.');
      }

      await fetchMilestones();
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.');
    }
  };

  const handleStateChange = async (milestone: Milestone) => {
    await updateMilestoneState(milestone.id, !milestone.isClosed);
  };

  const handleCreateMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      await createMilestone(formData);
      setMode('list');
      setFormData({ title: '', description: '', expiredAt: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.');
    }
  };

  const handleUpdateMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !editingMilestone) return;

    try {
      await updateMilestone(editingMilestone.id, formData);
      setMode('list');
      setEditingMilestone(null);
      setFormData({ title: '', description: '', expiredAt: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.');
    }
  };

  const handleEditClick = (milestone: Milestone) => {
    setEditingMilestone(milestone);
    setFormData({
      title: milestone.title,
      description: milestone.description || '',
      expiredAt: milestone.expiredAt || '',
    });
    setMode('edit');
  };

  const handleCancel = () => {
    setMode('list');
    setEditingMilestone(null);
    setFormData({ title: '', description: '', expiredAt: '' });
  };

  const filteredMilestones = milestones.filter(milestone =>
    filter === 'open' ? !milestone.isClosed : milestone.isClosed
  );

  const openMilestonesCount = milestones.filter(m => !m.isClosed).length;
  const closedMilestonesCount = milestones.filter(m => m.isClosed).length;

  const calculateProgress = (total: number, closed: number) => {
    if (total === 0) return 0;
    return Math.round((closed / total) * 100);
  };

  useEffect(() => {
    fetchMilestones();
  }, []);

  if (isLoading) {
    return <LoadingMessage>로딩 중...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const renderContent = () => {
    return (
      <>
        <FilterContainer>
          <FilterButton
            active={filter === 'open'}
            onClick={() => setFilter('open')}
          >
            열린 마일스톤 ({openMilestonesCount})
          </FilterButton>
          <FilterButton
            active={filter === 'closed'}
            onClick={() => setFilter('closed')}
          >
            닫힌 마일스톤 ({closedMilestonesCount})
          </FilterButton>
        </FilterContainer>

        <MilestoneList>
          {mode === 'create' && (
            <FormContainer>
              <FormHeader>
                <FormTitle>새로운 마일스톤</FormTitle>
              </FormHeader>
              <form onSubmit={handleCreateMilestone}>
                <FormGroup>
                  <Label htmlFor="title">제목 *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="마일스톤 제목"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="description">설명</Label>
                  <TextArea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="마일스톤 설명"
                    rows={4}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="expiredAt">완료일</Label>
                  <Input
                    id="expiredAt"
                    type="date"
                    value={formData.expiredAt}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiredAt: e.target.value }))}
                  />
                </FormGroup>
                <ButtonGroup>
                  <CancelButton type="button" onClick={handleCancel}>
                    취소
                  </CancelButton>
                  <SubmitButton type="submit">
                    생성
                  </SubmitButton>
                </ButtonGroup>
              </form>
            </FormContainer>
          )}

          {filteredMilestones.length === 0 ? (
            <EmptyState>
              <EmptyStateText>마일스톤이 없습니다.</EmptyStateText>
              <EmptyStateSubText>새로운 마일스톤을 생성해보세요!</EmptyStateSubText>
            </EmptyState>
          ) : (
            filteredMilestones.map((milestone) => (
              <MilestoneItem key={milestone.id}>
                {editingMilestone?.id === milestone.id ? (
                  <FormContainer>
                    <FormHeader>
                      <FormTitle>마일스톤 수정</FormTitle>
                    </FormHeader>
                    <form onSubmit={handleUpdateMilestone}>
                      <FormGroup>
                        <Label htmlFor="title">제목 *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="마일스톤 제목"
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="description">설명</Label>
                        <TextArea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="마일스톤 설명"
                          rows={4}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="expiredAt">완료일</Label>
                        <Input
                          id="expiredAt"
                          type="date"
                          value={formData.expiredAt}
                          onChange={(e) => setFormData(prev => ({ ...prev, expiredAt: e.target.value }))}
                        />
                      </FormGroup>
                      <ButtonGroup>
                        <CancelButton type="button" onClick={handleCancel}>
                          취소
                        </CancelButton>
                        <SubmitButton type="submit">
                          수정
                        </SubmitButton>
                      </ButtonGroup>
                    </form>
                  </FormContainer>
                ) : (
                  <>
                    <MilestoneInfo>
                      <MilestoneTitle>{milestone.title}</MilestoneTitle>
                      {milestone.description && (
                        <MilestoneDescription>
                          {milestone.description}
                        </MilestoneDescription>
                      )}
                      <MilestoneMeta>
                        <MilestoneProgressBar
                          percentage={calculateProgress(
                            milestone.totalIssueCount,
                            milestone.closedIssueCount
                          )}
                        >
                          <ProgressInfo>
                            <span>전체 {milestone.totalIssueCount}개</span>
                            <span>•</span>
                            <span>열림 {milestone.totalIssueCount - milestone.closedIssueCount}개</span>
                            <span>•</span>
                            <span>닫힘 {milestone.closedIssueCount}개</span>
                          </ProgressInfo>
                        </MilestoneProgressBar>
                        {milestone.expiredAt && (
                          <DueDate>
                            완료일: {new Date(milestone.expiredAt).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                          </DueDate>
                        )}
                      </MilestoneMeta>
                    </MilestoneInfo>
                    <MilestoneActions>
                      <ActionButton onClick={() => handleStateChange(milestone)}>
                        {milestone.isClosed ? '다시 열기' : '닫기'}
                      </ActionButton>
                      <ActionButton onClick={() => handleEditClick(milestone)}>
                        편집
                      </ActionButton>
                      <ActionButton onClick={() => deleteMilestone(milestone.id)}>
                        삭제
                      </ActionButton>
                    </MilestoneActions>
                  </>
                )}
              </MilestoneItem>
            ))
          )}
        </MilestoneList>
      </>
    );
  };

  return (
    <VerticalStack>
      <PageHeader>
        <LabelMilestoneTab labelCount={0} milestoneCount={milestones.length} />
        {mode === 'list' && (
          <NewMilestoneButton onClick={() => setMode('create')}>
            마일스톤 추가
          </NewMilestoneButton>
        )}
      </PageHeader>

      {renderContent()}
    </VerticalStack>
  );
}

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0 32px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.neutral.border.default};
`;

const FilterButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: ${props => props.active ? props.theme.palette.blue : props.theme.neutral.text.weak};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? props.theme.palette.blue : 'transparent'};

  &:hover {
    color: ${props => props.theme.palette.blue};
  }
`;

const MilestoneList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 24px 32px;
`;

const MilestoneItem = styled.div`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.neutral.border.default};
  border-radius: ${({ theme }) => theme.radius.large};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.neutral.surface.default};
`;

const MilestoneInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MilestoneTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.neutral.text.strong};
`;

const MilestoneDescription = styled.p`
  color: ${({ theme }) => theme.neutral.text.weak};
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: pre-wrap;
  max-width: 600px;
`;

const MilestoneMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const DueDate = styled.span`
  color: ${({ theme }) => theme.neutral.text.weak};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const ProgressInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.neutral.text.weak};
  font-size: 0.875rem;
`;

const MilestoneActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.neutral.surface.strong};
  border: 1px solid ${({ theme }) => theme.neutral.border.default};
  border-radius: ${({ theme }) => theme.radius.medium};
  cursor: pointer;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.neutral.text.strong};

  &:hover {
    background-color: ${({ theme }) => theme.neutral.surface.bold};
  }
`;

const NewMilestoneButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.palette.blue};
  border-color: ${({ theme }) => theme.palette.blue};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.palette.blue};
    opacity: 0.9;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  border: 2px dashed ${({ theme }) => theme.neutral.border.default};
  border-radius: ${({ theme }) => theme.radius.large};
  background-color: ${({ theme }) => theme.neutral.surface.default};
`;

const EmptyStateText = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.neutral.text.strong};
`;

const EmptyStateSubText = styled.p`
  color: ${({ theme }) => theme.neutral.text.weak};
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  color: #586069;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  color: #d73a49;
`;


const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.neutral.text.strong};
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.neutral.border.default};
  border-radius: ${({ theme }) => theme.radius.medium};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.neutral.text.strong};
  background-color: ${({ theme }) => theme.neutral.surface.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.blue};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.blue}33;
  }

  &::placeholder {
    color: ${({ theme }) => theme.neutral.text.weak};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.neutral.border.default};
  border-radius: ${({ theme }) => theme.radius.medium};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.neutral.text.strong};
  background-color: ${({ theme }) => theme.neutral.surface.default};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.blue};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.blue}33;
  }

  &::placeholder {
    color: ${({ theme }) => theme.neutral.text.weak};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 32px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.medium};
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.neutral.surface.strong};
  border: 1px solid ${({ theme }) => theme.neutral.border.default};
  color: ${({ theme }) => theme.neutral.text.strong};

  &:hover {
    background-color: ${({ theme }) => theme.neutral.surface.bold};
  }
`;

const SubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.blue};
  border: 1px solid ${({ theme }) => theme.palette.blue};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.palette.blue};
    opacity: 0.9;
  }
`;

const FormContainer = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.neutral.surface.default};
  border: 1px solid ${({ theme }) => theme.neutral.border.default};
  border-radius: ${({ theme }) => theme.radius.large};
  margin-bottom: 16px;
  width: 100%;
`;

const FormHeader = styled.div`
  margin-bottom: 24px;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.neutral.text.strong};
`;
