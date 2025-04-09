import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../redux/store';

interface PatternState {
  items: any[];
}

const initialState: PatternState = {
  items: [],
};

export const patternSlice = createSlice({
  name: 'patterns',
  initialState,
  reducers: {
    setPatternItems: (state, action: PayloadAction<any[]>) => {
      console.log('Setting pattern items:', action.payload); // Log the payload
      state.items = action.payload; // Update the `items` property
    },
  },
});

export const { setPatternItems } = patternSlice.actions;

// Selector to get pattern items from the state
export const selectPatternItems = (state: RootState) => state.patterns.items;

export default patternSlice.reducer;
