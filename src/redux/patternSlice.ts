import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../redux/store';
import { Pattern } from './types';

interface PatternState {
  items: Pattern[];
  columnNames: string[];
}

const initialState: PatternState = {
  items: [],
  columnNames: [],
};

export const patternSlice = createSlice({
  name: 'patterns',
  initialState,
  reducers: {
    setPatternItems: (state, action: PayloadAction<Pattern[]>) => {
      state.items = action.payload;
    },
    setPatternColumnNames: (state, action: PayloadAction<string[]>) => {
      state.columnNames = action.payload;
    },
  },
});

export const { setPatternItems, setPatternColumnNames } = patternSlice.actions;

export const selectPatternItems = (state: RootState) => state.patterns.items;
export const selectPatternColumnNames = (state: RootState) => state.patterns.columnNames;

export default patternSlice.reducer;
