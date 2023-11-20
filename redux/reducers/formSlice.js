// formSlice.js

import {createSlice} from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {},
  reducers: {
    setFormValue: (state, action) => {
      const {name, value} = action.payload;
      state[name] = value;
    },
    clearStateForm: state => {
      return {};
    },
  },
});

export const {setFormValue, clearStateForm} = formSlice.actions;

export default formSlice.reducer;
