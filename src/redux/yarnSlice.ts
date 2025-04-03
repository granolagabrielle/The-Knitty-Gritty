import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../redux/store';

interface YarnState {
  items: any[]; // Replace `any[]` with a proper type if you know the structure of your yarn items
}

const initialState: YarnState = {
  items: [],
};

export const yarnSlice = createSlice({
  name: 'yarn',
  initialState,
  reducers: {
    setYarnItems: (state, action: PayloadAction<any[]>) => {
      console.log('Setting yarn items:', action.payload); // Log the payload
      state.items = action.payload; // Update the `items` property
    },
  },
});

export const { setYarnItems } = yarnSlice.actions;

// Selector to get yarn items from the state
export const selectYarnItems = (state: RootState) => state.yarn.items;

export default yarnSlice.reducer;
