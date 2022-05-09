import axiosClient from "./axiosClient";

const RecruitmentApi = {
  getListRecruitment: () => {
    const url = `/tinTuyenDungs`;
    return axiosClient.get(url);
  },
  getListRecruitmentFilterParams: (params) => {
    const url = `/tinTuyenDungs/timKiemTheoNhieuTieuChi`;
    return axiosClient.get(url, { params });
  },
  getListTopNewsRecruitments: () => {
    const url = `/tinTuyenDungs/tinNoiBat`;
    return axiosClient.get(url);
  },
  getRecruitmentById: (id) => {
    const url = `/tinTuyenDungs/${id}`;
    return axiosClient.get(url);
  },
};

export default RecruitmentApi;