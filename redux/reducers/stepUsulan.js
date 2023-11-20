import {createSlice} from '@reduxjs/toolkit';

const StepSlice = createSlice({
  name: 'StepSlice',
  initialState: {
    activeStep: 1,
  },
  reducers: {
    setActiveStep: (state, action) => {
      return {
        ...state,
        activeStep: action.payload,
      };
    },
    clearState: () => {
      return {
        activeStep: 1,
      };
    },
  },
});

export const {clearState, setActiveStep} = StepSlice.actions;
export default StepSlice.reducer;
