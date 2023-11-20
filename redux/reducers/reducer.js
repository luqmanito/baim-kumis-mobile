import {combineReducers} from 'redux';
import stepUsulan from './stepUsulan';
import usulanSlice from './usulan';
import formReducer from './formSlice';
import isActiveUpload from './isActiveUpload';
import daftarTunggu from './daftar-tunggu';
import hasilPelaksanaan from './hasil-pelaksanaan';

const reducer = combineReducers({
  usulanSlice: usulanSlice,
  stepSlice: stepUsulan,
  form: formReducer,
  uploadSlice: isActiveUpload,
  daftarTunggu: daftarTunggu,
  hasilPelaksanaan: hasilPelaksanaan,
});

export default reducer;
