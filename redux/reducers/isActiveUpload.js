import {createSlice} from '@reduxjs/toolkit';

const UploadSlice = createSlice({
  name: 'UploadSlice',
  initialState: {
    activeStep: '',
  },
  reducers: {
    setActiveStep: (state, action) => {
      return {
        ...state,
        activeStep: action.payload,
      };
    },
    clearStateUpload: () => {
      return {
        activeStep: '',
      };
    },
  },
});

export const {clearStateUpload, setActiveStep} = UploadSlice.actions;
export default UploadSlice.reducer;
