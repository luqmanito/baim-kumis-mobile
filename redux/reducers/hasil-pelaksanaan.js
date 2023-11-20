import {createSlice} from '@reduxjs/toolkit';

const hasilPelaksanaanSlice = createSlice({
  name: 'UsulanSlice',
  initialState: {
    hasilPelaksanaan: [],
  },
  reducers: {
    setHasilPelaksanaanDetail: (state, action) => {
      return {
        ...state,
        hasilPelaksanaan: action.payload,
      };
    },

    clearStateHasilPelaksanaan: () => {
      return {
        hasilPelaksanaan: [],
      };
    },
  },
});

export const {setHasilPelaksanaanDetail, clearStateHasilPelaksanaan} =
  hasilPelaksanaanSlice.actions;
export default hasilPelaksanaanSlice.reducer;
