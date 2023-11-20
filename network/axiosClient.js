import axios from 'axios';
import configFile from '../config';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

// const baseUrl = API_URL;
// const baseUrl = configFile.API_URL;

// import store from '@/store';

// import router from '@/router';

const axiosClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 15000,
  // headers: {
  //   'APP-ID': APP_ID,
  // },
});

axiosClient.interceptors.request.use(
  async config => {
    console.log('Request Payload:', config?.data);
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  },
  error => {
    console.error('Error with Axios request interceptor:', error);
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(response => {
  return response.data;
});

export default axiosClient;
