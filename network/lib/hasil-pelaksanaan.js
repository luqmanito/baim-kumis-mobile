import axiosClient from '../axiosClient';

export default {
  hasilPelaksanaanList({page, search, length}) {
    return axiosClient.get(
      `api/rutilahu/hasil-pelaksanaan/data-list?search=${search}&page=${page}&length=${length}`,
    );
  },
};
