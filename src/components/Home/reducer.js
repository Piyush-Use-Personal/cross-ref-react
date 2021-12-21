/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    value: 'Please select input file',
  },
  reducers: {
    changeValue: () => {},
    setValue: (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { changeValue, setValue } = homeSlice.actions;

export default homeSlice.reducer;
