import axiosClient from '../axiosClient';

export default {
  daftarTungguList({page, search, length}) {
    return axiosClient.get(
      `api/rutilahu/daftar-tunggu/data-list?search=${search}&page=${page}&length=${length}`,
    );
  },
};
