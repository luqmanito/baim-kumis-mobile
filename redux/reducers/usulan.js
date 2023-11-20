import {createSlice} from '@reduxjs/toolkit';

const usulanSlice = createSlice({
  name: 'UsulanSlice',
  initialState: {
    usulan: [],
  },
  reducers: {
    setUsulan: (state, action) => {
      return {
        ...state,
        usulan: action.payload,
      };
    },

    clearState: () => {
      return {
        usulan: [],
        activeStep: 1,
      };
    },
  },
});

export const {setUsulan, clearState} = usulanSlice.actions;
export default usulanSlice.reducer;
