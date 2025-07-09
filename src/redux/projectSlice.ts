import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Project } from './types';

interface ProjectState {
  items: Project[];
  columnNames: string[];
}

const initialState: ProjectState = {
  items: [],
  columnNames: [],
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectItems: (state, action: PayloadAction<Project[]>) => {
      state.items = action.payload;
    },
    setProjectColumnNames: (state, action: PayloadAction<string[]>) => {
      state.columnNames = action.payload;
    },
  },
});

export const { setProjectItems, setProjectColumnNames } = projectSlice.actions;

export const selectProjectItems = (state: RootState) => state.projects.items;
export const selectProjectColumnNames = (state: RootState) => state.projects.columnNames;

export default projectSlice.reducer;
