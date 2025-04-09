import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../redux/store';

interface YarnState {
  items: any[];
  columnNames: string[];
}

const initialState: YarnState = {
  items: [],
  columnNames: [],
};

export const yarnSlice = createSlice({
  name: 'yarn',
  initialState,
  reducers: {
    setYarnItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
    setYarnColumnNames: (state, action: PayloadAction<any[]>) => {
      state.columnNames = action.payload;
    },
  },
});

export const { setYarnItems, setYarnColumnNames } = yarnSlice.actions;

export const selectYarnItems = (state: RootState) => state.yarn.items;
export const selectYarnColumnNames = (state: RootState) => state.yarn.columnNames;

export default yarnSlice.reducer;
