import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import RecruitmentApi from "../../../services/recruitmentApi";
import CareerApi from "../../../services/careerApi";
import FieldCompanyApi from "../../../services/fieldCompanyApi";
import { GlobalData } from "../../../data/globalData";

import {
  BAN_THOI_GIAN,
  LINH_VUC,
  TOAN_THOI_GIAN,
  VI_TRI,
} from "../../../constansts/common";
export const CommonContext = createContext({});

const CommonProvider = ({ children, ...props }) => {
  // Tin tuyển dụng
  const [recruitments, setRecruitments] = useState([]);
  const [location, setLocation] = useState([]);
  const [recruitmentsPartTime, setRecruitmentsPartTime] = useState([]);
  const [fields, setFields] = useState([]);
  const [position, setPosition] = useState([]);
  const [recruitmentsFullTime, setRecruitmentsFullTime] = useState([]);
  const [listCareers, setListCareers] = useState([]);
  const [recruitmentsTopNews, setRecruitmentsTopNews] = useState([]);
  const [companyFields, setCompanyFields] = useState([]);
  const levels = GlobalData.capBacData();
  const typeWorks = GlobalData.loaiCongViec();
  const experiences = GlobalData.kinhNghiem();
  const wages = GlobalData.mucLuongData();

  const getListData = async () => {
    try {
      const response = await RecruitmentApi.getListRecruitment();
      setRecruitments(response.data);
      setLocation(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getListDataPartTime = async (filter) => {
    try {
      const response = await RecruitmentApi.getListRecruitmentFilterParams(
        filter
      );
      setRecruitmentsPartTime(response.data);
      console.log("response.data part time", response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getListDataFields = async (filter) => {
    try {
      const response = await RecruitmentApi.getListRecruitmentFilterParams(
        filter
      );
      setFields(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getListDataPosition = async (filter) => {
    try {
      const response = await RecruitmentApi.getListRecruitmentFilterParams(
        filter
      );
      setPosition(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  // Full time
  const getListDataFullTime = async (filter) => {
    try {
      const response = await RecruitmentApi.getListRecruitmentFilterParams(
        filter
      );
      setRecruitmentsFullTime(response.data);
      console.log("response.data full time", response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  // Tất cả ngành nghề
  const getListDataCareers = async () => {
    try {
      const response = await CareerApi.getListCareer();
      setListCareers(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  // Top 12 ứng tuyển nhiều nhất
  const getListDataTopNewsRecruitments = async () => {
    try {
      const response = await RecruitmentApi.getListTopNewsRecruitments();
      setRecruitmentsTopNews(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  // Tất cả lĩnh vực công ty
  const getListDataFieldsCompany = async () => {
    try {
      const response = await FieldCompanyApi.getListFieldsCompany();
      setCompanyFields(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getListData();
      getListDataPartTime(BAN_THOI_GIAN);
      getListDataFields(LINH_VUC);
      getListDataPosition(VI_TRI);
      getListDataFullTime(TOAN_THOI_GIAN);
      getListDataCareers();
      getListDataTopNewsRecruitments();
      getListDataFieldsCompany();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <CommonContext.Provider
      value={{
        location,
        recruitmentsPartTime,
        fields,
        position,
        recruitmentsFullTime,
        listCareers,
        recruitmentsTopNews,
        companyFields,
        recruitments,
        levels,
        typeWorks,
        experiences,
        wages,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

CommonProvider.propTypes = {
  children: PropTypes.any,
};

export default CommonProvider;

export function useCommonContext() {
  return React.useContext(CommonContext);
}
