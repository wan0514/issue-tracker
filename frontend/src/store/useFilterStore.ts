import { create } from 'zustand';

interface FilterState {
  labelIds: number[];
  assigneeIds: number[];
  authorId: number | null;
  milestoneId: number | null;

  setLabelIds: (ids: number[]) => void;
  setAssigneeIds: (ids: number[]) => void;
  setAuthor: (id: number | null) => void;
  setMilestone: (id: number | null) => void;

  clearFilter: () => void;
}

export const useFilterStore = create<FilterState>(set => ({
  labelIds: [],
  assigneeIds: [],
  authorId: null,
  milestoneId: null,

  setLabelIds: ids => set({ labelIds: ids }),
  setAssigneeIds: ids => set({ assigneeIds: ids }),
  setAuthor: id => set({ authorId: id }),
  setMilestone: id => set({ milestoneId: id }),

  clearFilter: () =>
    set({
      labelIds: [],
      assigneeIds: [],
      authorId: null,
      milestoneId: null,
    }),
}));
