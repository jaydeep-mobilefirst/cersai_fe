// src/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Common {
  value: number;
}

const initialState: Common = {
  value: 0,
};

export const CommonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {

  },
});

// Action creators are generated for each case reducer function
export const {  } = CommonSlice.actions;

export default CommonSlice.reducer;
