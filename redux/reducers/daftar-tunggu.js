import {createSlice} from '@reduxjs/toolkit';

const daftarTungguSlice = createSlice({
  name: 'UsulanSlice',
  initialState: {
    daftarTunggu: [],
  },
  reducers: {
    setDaftarTunggu: (state, action) => {
      return {
        ...state,
        daftarTunggu: action.payload,
      };
    },

    clearStateDaftarTunggu: () => {
      return {
        daftarTunggu: [],
      };
    },
  },
});

export const {setDaftarTunggu, clearStateDaftarTunggu} =
  daftarTungguSlice.actions;
export default daftarTungguSlice.reducer;
