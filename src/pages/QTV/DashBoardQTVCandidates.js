import { Layout, Menu, Breadcrumb, Input, Tooltip, Button } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { FaListUl, FaUserPlus } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import { Select } from "antd";
import { GrFormRefresh } from "react-icons/gr";
import { FaEllipsisV } from "react-icons/fa";
import RecruitmentApi from "../../services/recruitmentApi";
import TimeUtils from "../../utils/timeUtils";
import ReactPaginate from "react-paginate";
import Pagination from "../../components/Pagination/Pagination";
import PostFiltersForm from "../../components/Admin/PostFiltersForm";
import queryString from "query-string";
import axios from "axios";
import { Helmet } from "react-helmet";
import NavbarQTV from "./components/navbar/NavbarQTV";
import axiosClient from "../../services/axiosClient";

const { Option } = Select;

const { TabPane } = Tabs;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const DashBoardQTVCandidates = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 15,
  });

  const [recruitments, setRecruitments] = useState([]);
  const paramsString = queryString.stringify(filters);
  console.log("paramsString", paramsString);
  const [type, setType] = useState();
  const onHandleChangeType = (value) => {
    setType(value);
  };
  const [value, setValue] = useState(0);

  useEffect(() => {
    let mounted = true;
    const getDataListFilters = async () => {
      const requestUrl = `http://localhost:4000/ungTuyenViens`;
      try {
        const response = await axiosClient.get(requestUrl);
        setRecruitments(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    if (mounted) {
      getDataListFilters();
    }
    return () => {
      mounted = false;
      setRecruitments([]);
    };
  }, [filters]);

  // const prevPage = async () => {
  //   const pg = page === 1 ? 1 : page - 1;
  //    getListData(pg);
  //   setPage(pg);
  // };
  // const nextPage = async () => {
  //   const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
  //   // getListData(pg);
  //   setPage(pg);
  // };
  const handleFiltersStatusChange = (newFilters) => {
    console.log("New filters: ", newFilters);
    console.log("+VINH+;", {
      ...filters,
      page: 1,
      trangThai: newFilters,
    });
    setFilters({
      ...filters,
      page: 1,
      trangThai: newFilters,
    });
  };
  const handleFiltersChange = (newFilters) => {
    console.log("New filters: ", newFilters);
    setFilters({
      ...filters,
      page: 1,
      // tieuDe: newFilters.searchTerm,
    });
  };
  const [totalStatus, setTotalStatus] = useState();
  const [totalDungTuyen, setTotalDungTuyen] = useState();
  const [totalChoDuyet, setTotalChoDuyet] = useState();
  const [totalKhoa, setTotalKhoa] = useState();
  const [totalDaDuyet, setTotalDaDuyet] = useState();
  const [totalTuChoi, setTotalTuChoi] = useState();
  const [totalAll, setTotalAll] = useState();

  useEffect(() => {
    const getTotalStatus = async () => {
      const requestUrl = `http://localhost:4000/tinTuyenDungs/tongSoTinTheoTrangThai`;
      try {
        const response = await axios.get(requestUrl).then((res) => {
          res.data.data.map((item) => {
            if (item.trangThai == "D???ng tuy???n") setTotalDungTuyen(item.tong);
            if (item.trangThai == "Ch??? duy???t") setTotalChoDuyet(item.tong);
            if (item.trangThai == "Kh??a") setTotalKhoa(item.tong);
            if (item.trangThai == "???? duy???t") setTotalDaDuyet(item.tong);
            if (item.trangThai == "T??? ch???i") setTotalTuChoi(item.tong);
          });
        });

        setTotalStatus(response.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getTotalStatus();
  }, []);
  const [isGetRecruitmentReviewLeast, setIsGetRecruitmentReviewLeast] =
    useState(false);
  const [recruitmentReviewLeast, setRecruitmentReviewLeast] = useState([]);
  useEffect(() => {
    const getRecruitmentReviewLeast = async () => {
      const requestUrl = `http://localhost:4000/tinTuyenDungs/tinTuyenDungCoNguyCoKhoa`;
      try {
        const response = await axios.get(requestUrl);
        setRecruitmentReviewLeast(response?.data?.data);
        console.log("response getRecruitmentReviewLeast", response);
      } catch (error) {
        console.log(error.response);
      }
    };
    getRecruitmentReviewLeast();
  }, [isGetRecruitmentReviewLeast]);

  //Kh??a t??i kho???n
  const handleAddButtonClickBlock = async (id) => {
    const requestUrl = `http://localhost:4000/quanTriViens/khoataikhoan/${id}`;
    try {
      const response = await axios.patch(requestUrl);
    } catch (error) {
      console.log(error.response);
    }
  };

  //M??? kh??a t??i kho???n
  const handleAddButtonClickUnBlock = async (id) => {
    const requestUrl = `http://localhost:4000/quanTriViens/motaikhoan/${id}`;
    try {
      const response = await axios.patch(requestUrl);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>[Admin] - Trang ch??? qu???n tr??? vi??n</title>
      </Helmet>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <NavbarQTV />
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
              <Breadcrumb.Item>T???ng quan</Breadcrumb.Item>
              <Breadcrumb.Item>Qu???n l?? tin ????ng</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background bg-white"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <strong>T???t c??? tin tuy???n d???ng</strong>
              <div className="row">
                <div className="col-12">
                  <Tabs
                    defaultActiveKey="6"
                    value={value}
                    onChange={(e) => {
                      setValue(e);
                      handleFiltersStatusChange(e);
                      console.log("key ABC", e);
                      setIsGetRecruitmentReviewLeast(false);

                      if (e == 9) {
                        setIsGetRecruitmentReviewLeast(true);
                      }
                    }}
                  >
                    <TabPane tab={`T???t c???`} key="6">
                      <div className="row">
                        <div className="col-2">
                          <PostFiltersForm onSubmit={handleFiltersChange} />
                        </div>
                        <div className="col-2">
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="T???t c??? ng??nh ngh???"
                            optionFilterProp="children"
                            onChange={(value) => {
                              console.log("Value", value);
                            }}
                            onSearch={(value) => {
                              console.log("Value search", value);
                            }}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                          </Select>
                        </div>
                        <div className="col-2">
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="T???t c??? c???p b???c"
                            optionFilterProp="children"
                            onChange={(value) => {
                              console.log("Value", value);
                            }}
                            onSearch={(value) => {
                              console.log("Value search", value);
                            }}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                          </Select>
                        </div>
                        <div className="col-3">
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="T???t c??? h??nh th???c l??m vi???c"
                            optionFilterProp="children"
                            onChange={(value) => {
                              console.log("Value", value);
                            }}
                            onSearch={(value) => {
                              console.log("Value search", value);
                            }}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                          </Select>
                        </div>
                        <div className="col-2">
                          <Select
                            style={{ width: "100%" }}
                            defaultValue="lucy"
                            onChange={(value) => {
                              console.log("Value", value);
                            }}
                          >
                            <Option value="jack">????ng g???n nh???t</Option>
                            <Option value="lucy">????ng c?? nh???t</Option>
                          </Select>
                        </div>
                        {/* <div className="col-1 me-3">
                          <Button
                            style={{ width: "120px" }}
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            icon={<SearchOutlined />}
                          >
                            T??m ki???m
                          </Button>
                        </div> */}
                        <div className="col-1">
                          <Button
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            // icon={<GrFormRefresh />}
                            onClick={() => {
                              window.location.reload();
                            }}
                          >
                            L??m m???i
                          </Button>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-12">
                          <div className="card mb-4">
                            <div className="card-body px-0 pt-0 pb-2">
                              <div className="table-responsive p-0">
                                <table className="table align-items-center justify-content-center mb-0">
                                  <thead className="bg-dark">
                                    <tr>
                                      <th className="text-secondary opacity-7 text-white py-3 text-center">
                                        <strong>STT</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                        <strong>T??n ???ng tuy???n vi??n</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                        <strong>?????a ch???</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                        <strong>S??? ??i???n tho???i</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                        <strong>Email</strong>
                                      </th>
                                      <th className="text-secondary text-center opacity-7 ps-2 text-center text-white py-3">
                                        <strong> Tr???ng th??i</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                        <strong>Thao t??c</strong>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {recruitments.map((item, index) => {
                                      return (
                                        <tr key={index}>
                                          <td className="align-middle">
                                            <p className="text-sm font-weight-bold mb-0 text-center">
                                              {index + 1}
                                            </p>
                                          </td>
                                          <td>
                                            <p className="text-sm fw-bold mb-0">
                                              {item?.ten}
                                            </p>

                                            <p className="address">
                                              <span className="created">
                                                Gi???i t??nh:  {item?.gioiTinh}
                                              </span>
                                            </p>
                                            <p className="address">
                                              <span className="created">
                                                Ng??y sinh:{" "}
                                                {TimeUtils.formatDateTime(
                                                  item?.ngaySinh,
                                                  "DD-MM-YYYY"
                                                )}
                                              </span>
                                            </p>

                                            <p>
                                              <Link
                                                to={`/job-detail/${item._id}`}
                                                target="_blank"
                                              >
                                                Xem th??ng tin ???ng tuy???n vi??n
                                              </Link>
                                            </p>
                                          </td>
                                          <td className="align-middle">
                                            <span className="text-xs font-weight-bold d-flex align-items-center  text-center">
                                              {item?.diaChi}
                                            </span>
                                          </td>
                                          <td className="text-center align-middle">
                                            <span>{item?.sdt}</span>
                                          </td>
                                          <td className="text-center align-middle">
                                            <span>{item?.taiKhoan?.email}</span>
                                          </td>
                                          <td className="text-center align-middle">
                                            {item?.taiKhoan?.trangThai ? (<span>Ho???t ?????ng</span>) : (<span>Kh??a</span>)}

                                          </td>
                                          <td className="text-center cursor-pointer align-middle pointer">
                                            <div class="dropdown">
                                              <button
                                                class="btn btn-secondary dropdown-toggle"
                                                type="button"
                                                id="dropdownMenuButton1"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                Chi ti???t
                                              </button>
                                              <ul
                                                class="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton1"
                                              >
                                                <li>
                                                  <span class="dropdown-item">
                                                    Xem
                                                  </span>
                                                </li>
                                                {item?.taiKhoan?.trangThai ? (
                                                  <li onClick={() => {
                                                    handleAddButtonClickBlock(
                                                      item?._id
                                                    );
                                                  }}>
                                                    <span class="dropdown-item">
                                                      Kh??a
                                                    </span>
                                                  </li>
                                                ) : (<li onClick={() => {
                                                  handleAddButtonClickUnBlock(
                                                    item?._id
                                                  );
                                                }}>
                                                  <span class="dropdown-item">
                                                    M??? kh??a
                                                  </span>
                                                </li>)}
                                              </ul>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        {recruitments.length < 1 && (
                          <div className="col-12">
                            <div
                              className="alert alert-warning text-center"
                              role="alert"
                            >
                              Kh??ng c?? d??? li???u
                            </div>
                          </div>
                        )}
                        {/* <div className="col-12">
                          Showing {totalCount === 0 ? 0 : offset + 1} to{" "}
                          {offset + 10 > totalCount
                            ? totalCount
                            : offset + pageSize}{" "}
                          of {totalCount}
                        </div> */}
                        <div className="col-12">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                              <li
                                className={`page-item ${page <= 1 ? "disabled drop" : ""
                                  }`}
                              >
                                <button
                                  type="button"
                                  className="page-link"
                                  disabled={page <= 1}
                                  onClick={() => {
                                    // prevPage();
                                  }}
                                >
                                  Trang tru???c
                                </button>
                              </li>
                              <li
                                className={`page-item ${page >= totalCount ? "disabled drop" : ""
                                  }`}
                              >
                                <button
                                  className="page-link"
                                  type="button"
                                  disabled={page >= totalCount}
                                  onClick={() => {
                                    // nextPage();
                                  }}
                                >
                                  Trang sau
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </TabPane>

                  </Tabs>
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
            Ant Design ??2018 Created by Trung Vinh
          </Footer>
        </Layout>
      </Layout>
    </Fragment>
  );
};
export default DashBoardQTVCandidates;
