import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import TabAccountInformation from "./components/TabAccountInformation";
import { useSelector } from "react-redux";
import MainNavigation from "../../components/Layout/MainNavigation";
import portfolioApi from "../../services/portfoliApi";
import { toast } from "react-toastify";
import Helmet from "react-helmet";

const { TabPane } = Tabs;
const AccountSetupPage = (props) => {
  const currentUser = useSelector((state) => state?.userLogin?.user?.taiKhoan);
  const [user, setUser] = useState({});
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);

  const getProfileDetail = async (id) => {
    try {
      const response = await portfolioApi.getAccountById(id);
      setUser(response?.data);
      setIsSuccessSubmit(false);
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    console.log("Run away api get detail");
    setIsSuccessSubmit(true);
  }, []);

  useEffect(() => {
    getProfileDetail(currentUser?._id);
  }, [isSuccessSubmit]);

  useEffect(() => {
    if (currentUser !== "undefined") setIsSuccessSubmit(true);
  }, [currentUser?.email]);

  return (
    <>
      {" "}
      <Helmet>
        <title>Setting account | 123job.org</title>
      </Helmet>
      <MainNavigation />
      <div className="bg-main mt-65">
        <div className="container">
          <Tabs tabPosition="left">
            <TabPane tab="Thông tin tài khoản" key="1">
              <TabAccountInformation
                user={user}
                getProfileDetail={getProfileDetail}
                setIsSuccessSubmit={setIsSuccessSubmit}
                isSuccessSubmit={isSuccessSubmit}
              />
            </TabPane>
            <TabPane tab="Thiết lập thông báo" key="2">
              Content of Tab 2
            </TabPane>
            <TabPane tab="Chuyển đổi tài khoản NTD" key="3">
              Content of Tab 3
            </TabPane>
            <TabPane tab="Đăng xuất" key="4">
              Content of Tab 4
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AccountSetupPage;