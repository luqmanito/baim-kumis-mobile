import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import reducers from './reducers/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['stepSlice'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({thunk: true, serializableCheck: false}),
});

export const persistedStore = persistStore(store);
export default store;
