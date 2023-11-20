import axiosClient from '../axiosClient';

export default {
  login({email, password}) {
    return axiosClient.post('api/login', {email, password});
  },
};
