import axiosClient from '../axiosClient';

export default {
  usulanList({start_date, end_date, search, length}) {
    return axiosClient.get(
      `api/rutilahu/usulan/data-list?start_date=${start_date}&end_date=${end_date}&search=${search}&length=${length}`,
    );
  },
  cekKK({no_kk}) {
    return axiosClient.get(`api/rutilahu/usulan/create/check?no_kk=${no_kk}`);
  },
  deleteList({usulan_id}) {
    return axiosClient.delete(`api/rutilahu/usulan/delete/${usulan_id}`);
  },
  usulanDropdown() {
    return axiosClient.get('api/rutilahu/usulan/create/dropdown');
  },
  listDesa({search, page, length}) {
    return axiosClient.get(
      `api/desa/data-list?search=${search}&page=${page}&length=${length}`,
    );
  },
  createUsulanUpdateHunian({
    id,
    desa_id,
    status_kepemilikan_id,
    fisik_bangunan_id,
    bentuk_bangunan_id,
    pendapatan_keluarga_id,
    foto_hunian,
    luas_tanah,
    luas_bangunan,
    layak_huni,
    tersedia_listrik,
    dibangun_oleh_pengembang,
    memiliki_imb,
    nama_pengembang,
    nomor_imb,
    foto_pemilik,
    nama_pemilik,
    nik_pemilik,
    no_kk_pemilik,
    tanggal_lahir_pemilik,
    no_telepon_pemilik,
    email_pemilik,
    jumlah_keluarga,
    alamat_detail,
    latitude,
    longitude,
    kondisi_atap,
    kondisi_dinding,
    kondisi_lantai,
    kondisi_kamar_mandi,
    kondisi_mck,
    kondisi_sumber_air_minum,
    septic_tank,
    luas_bangunan_perkapita,
  }) {
    return axiosClient.post(`api/rutilahu/usulan/create/update/${id}`, {
      desa_id,
      status_kepemilikan_id,
      fisik_bangunan_id,
      bentuk_bangunan_id,
      pendapatan_keluarga_id,
      foto_hunian,
      luas_tanah,
      luas_bangunan,
      layak_huni,
      tersedia_listrik,
      dibangun_oleh_pengembang,
      memiliki_imb,
      nama_pengembang,
      nomor_imb,
      foto_pemilik,
      nama_pemilik,
      nik_pemilik,
      no_kk_pemilik,
      tanggal_lahir_pemilik,
      no_telepon_pemilik,
      email_pemilik,
      jumlah_keluarga,
      alamat_detail,
      latitude,
      longitude,
      kondisi_atap,
      kondisi_dinding,
      kondisi_lantai,
      kondisi_kamar_mandi,
      kondisi_mck,
      kondisi_sumber_air_minum,
      septic_tank,
      luas_bangunan_perkapita,
    });
  },
  usulanCreate({hunian_id, sumber_dana_bantuan_id}) {
    return axiosClient.post('api/rutilahu/usulan/create', {
      hunian_id,
      sumber_dana_bantuan_id,
    });
  },
  usulanEdit({
    hunian_id,
    sumber_dana_bantuan_id,
    status,
    verifikator_id,
    pengusul_id,
    rencana_penanganan,
    nominal,
    pesan,
  }) {
    return axiosClient.post('api/rutilahu/usulan/update/1', {
      hunian_id,
      sumber_dana_bantuan_id,
      status,
      verifikator_id,
      pengusul_id,
      rencana_penanganan,
      nominal,
      pesan,
    });
  },
  usulanCreateImage({jenis, file}) {
    return axiosClient.post('api/rutilahu/usulan/create/image/hunian/53', {
      jenis,
      file,
    });
  },
  usulanHunianCreate({no_kk_pemilik}) {
    return axiosClient.post('api/hunian/create', {
      no_kk_pemilik,
    });
  },
  usulanCreateImage2({data}) {
    console.log(data);
    return axiosClient(`api/rutilahu/usulan/create/image/hunian/53`, {
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
