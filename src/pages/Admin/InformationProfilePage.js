import { Breadcrumb, Layout, Menu, Select, Tabs } from "antd";
import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { AiFillEdit } from "react-icons/ai";
import NavbarAdmin from "./components/navbar/NavbarAdmin";
import axiosClient from "../../services/axiosClient";

const { Option } = Select;

const { TabPane } = Tabs;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const InformationProfilePage = () => {


  return (
    <Fragment>
      <Helmet>
        <title>[Employer] - Thông tin công ty</title>
      </Helmet>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <NavbarAdmin />
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          />
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>Tổng quan</Breadcrumb.Item>
              <Breadcrumb.Item>Thông tin công ty</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background bg-white"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <strong>Hồ sơ</strong>
              <div className="row">
                <div className="col-12">
                  <div className="text-center">
                    <h5>
                      <strong>Công ty TNHH Alpaca</strong>
                    </h5>
                  </div>
                  <div className="text-center">
                    <p>
                      <span>Trụ sở: Công ty TNHH Alpaca</span>
                    </p>
                  </div>
                  <div className="text-center">
                    <p>
                      <button className="btn btn-danger px-2 py-1">
                        Chỉnh sửa
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4 border">
                  <div className="row">
                    <div className="col-12 p-3 border-bottom">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <span>Liên hệ</span>
                        </div>
                        <div>
                          <button className="btn btn-danger px-2 py-1">
                            Chỉnh sửa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <strong>Họ và tên</strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-8 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <span>Mickey Mouse</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <strong>Số điện thoại</strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-8 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <span>0987555555</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <strong>Địa chỉ email</strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-8 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <span>vinh59280@gmail.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-8 border">
                  <div className="row">
                    <div className="col-12 p-3 border-bottom">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <span>Thông tin</span>
                        </div>
                        <div>
                          <button className="btn btn-danger px-2 py-1">
                            Chỉnh sửa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <strong>Website</strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-8 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <span>https://employer.123job.org</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <strong>Năm thành lập</strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-8 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <span>2021</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <strong>Quy mô công ty</strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-8 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <span>10 - 25</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <strong>Mô tả công ty</strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-8 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <span className="text-info">
                            fasdfasfasdfsdafsafsdafasdfsdafadsfsdfdasfsdfsdafdasfasdfasdf
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2018 Created by Trung Vinh
          </Footer>
        </Layout>
      </Layout>
    </Fragment>
  );
};
export default InformationProfilePage;
