import {
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Tooltip,
  Button,
  Dropdown,
} from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { Fragment, useEffect, useMemo, useState } from "react";
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
import ModalProfileDetail from "./components/modals/ModalProfileDetail";

const { Option } = Select;

const { TabPane } = Tabs;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AllProfilePage = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
  });

  const [recruitments, setRecruitments] = useState([]);
  const paramsString = queryString.stringify(filters);
  console.log("paramsString", paramsString);
  const [type, setType] = useState();
  const onHandleChangeType = (value) => {
    setType(value);
  };
  const [value, setValue] = useState(0);

  const getListData = async (pg = page, pgSize = pageSize) => {
    try {
      const params = {
        page: pg,
        limit: 15,
        // tieuDe: "",
        trangThai: "",
      };
      console.log("params", params);

      const response = await RecruitmentApi.getListProfile(params);

      console.log("response::: aaa", response.data);
      setRecruitments(response.data);
      setTotalCount(response.pagination.total);
    } catch (error) {
      console.log(error.response);
    }
  };

  // useEffect(() => {
  //   let mounted = true;
  //   const getDataListFilters = async () => {
  //     const requestUrl = `http://localhost:4000/donUngTuyens/timKiemTheoNhaTuyenDung?${paramsString}`;
  //     try {
  //       const response = await axios.get(requestUrl);
  //       console.log("responseresponse getDataListFilters", response.data.data);
  //       setRecruitments(response.data.data);
  //       setTotalCount(response.pagination.total);
  //     } catch (error) {
  //       console.log(error.response);
  //     }
  //   };
  //   if (mounted) {
  //     getDataListFilters();
  //   }
  //   return () => {
  //     mounted = false;
  //     setRecruitments([]);
  //   };
  // }, [filters]);

  useEffect(() => {
    getListData();
  }, [page]);

  const prevPage = async () => {
    const pg = page === 1 ? 1 : page - 1;
    getListData(pg);
    setPage(pg);
  };
  const nextPage = async () => {
    const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
    getListData(pg);
    setPage(pg);
  };
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
      tieuDe: newFilters.searchTerm,
    });
  };

  const [userProfile, setUserProfile] = useState();
  const [isShowModalProfile, setIsShowModalProfile] = useState(false);
  const handleAddButtonClickProfile = (item) => {
    // console.log("E", item);
    setUserProfile(item);
    // e.preventDefault();
    setIsShowModalProfile(true);
  };
  const handleSubmitModalProfile = () => {
    console.log("Submit modal profile");
  };
  const renderModalProfile = useMemo(() => {
    if (!isShowModalProfile) return null;

    return (
      <ModalProfileDetail
        showModal={isShowModalProfile}
        onCloseModal={() => {
          setIsShowModalProfile(false);
          // clearErrors();
        }}
        user={userProfile}
        onSubmit={handleSubmitModalProfile}
      />
    );
  }, [isShowModalProfile]);
  const [totalStatusApplication, setTotalStatusApplication] = useState();
  const [totalDangUT, setTotalDangUT] = useState();
  const [totalDaUT, setTotalDaUT] = useState();
  const [totalTuChoi, setTotalTuChoi] = useState();
  useEffect(() => {
    const getTotalApplication = async () => {
      const requestUrl = `http://localhost:4000/donUngTuyens/demDonUngTuyenTheoTrangThai`;
      try {
        const response = await axios.get(requestUrl).then((res) => {
          console.log("response abc res", res);

          res.data.data.map((item) => {
            if (item.trangThai == "Đang ứng tuyển") setTotalDangUT(item.tong);
            if (item.trangThai == "Đã ứng tuyển") setTotalDaUT(item.tong);
            if (item.trangThai == "Thất bại") setTotalTuChoi(item.tong);
          });
        });
      } catch (error) {
        console.log(error.response);
      }
    };
    getTotalApplication();
  }, []);

  return (
    <Fragment>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item icon={<DesktopOutlined />} key="1">
              Trang chủ
              <Link to="/employer/dashboard" />
            </Menu.Item>
            <Menu.SubMenu title="Tin tuyển dụng" icon={<FaListUl />} key="2">
              <Menu.Item key="21">
                Quản lý tin
                <Link to="/employer/dashboard" />
              </Menu.Item>
              <Menu.Item key="22">
                Thêm mới tin
                <Link to="/employer/job/create" />
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              title="Hồ sơ ứng tuyển"
              icon={<TeamOutlined />}
              key="3"
            >
              {/* <Link to="/employer/job/apply-job/all" /> */}
              <Menu.Item key="31">
                Tất cả đơn ứng tuyển
                <Link to="/employer/job/apply-job/all" />
              </Menu.Item>
              <Menu.Item key="32">
                Hồ sơ tiềm năng
                <Link to="/employer/job/apply-job/talent" />
              </Menu.Item>
              <Menu.Item key="33">
                Mới ứng tuyển
                <Link to="/employer/job/apply-job/new" />
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item icon={<DesktopOutlined />} key="4">
              Thông tin công ty
              <Link to="/employer/account/profile" />
            </Menu.Item>
            <Menu.Item icon={<GoSignOut />} key="5">
              Đăng xuất
              <Link to="/logout" />
            </Menu.Item>
          </Menu>
        </Sider>
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
              <Breadcrumb.Item>Tất cả đơn ứng tuyển</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background bg-white"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <strong>Tất cả đơn ứng tuyển</strong>
              <div className="row">
                <div className="col-12">
                  <Tabs
                    defaultActiveKey="6"
                    value={value}
                    onChange={(e) => {
                      setValue(e);
                      handleFiltersStatusChange(e);
                      console.log("key ABC", e);
                    }}
                  >
                    <TabPane tab={`Tất cả (${totalCount})`} key="6">
                      <div className="row">
                        <div className="col-2">
                          <PostFiltersForm
                            onSubmit={handleFiltersChange}
                            title="Tên tin tuyển dụng"
                          />
                        </div>
                        <div className="col-2">
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Thời gian tạo"
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
                            <Option value="jack">Đăng gần nhất</Option>
                            <Option value="lucy">Đăng cũ nhất</Option>
                          </Select>
                        </div>
                        {/* <div className="col-1 me-3">
                          <Button
                            style={{ width: "120px" }}
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            icon={<SearchOutlined />}
                          >
                            Tìm kiếm
                          </Button>
                        </div> */}
                        <div className="col-1 ms-3">
                          <Button
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            // icon={<GrFormRefresh />}
                            onClick={() => {
                              window.location.reload();
                            }}
                          >
                            Làm mới
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
                                        <strong> Thông tin ứng viên</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                        <strong>Tin tuyển dụng</strong>
                                      </th>
                                      <th className="text-secondary text-center opacity-7 ps-2 text-center text-white py-3">
                                        <strong> Trạng thái</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                        <strong>Thao tác</strong>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {recruitments.map((item, index) => {
                                      const {
                                        ungTuyenVien,
                                        tinTuyenDung,
                                        trangThai,
                                      } = item?.donTuyenDung;
                                      console.log(
                                        "v item?.donTuyenDung",
                                        item?.donTuyenDung
                                      );
                                      return (
                                        <tr key={index}>
                                          <td className="align-middle">
                                            <p className="text-sm font-weight-bold mb-0 text-center">
                                              {index + 1}
                                            </p>
                                          </td>
                                          <td>
                                            <p className="text-sm fw-bold mb-0">
                                              {ungTuyenVien?.ten}
                                            </p>
                                            <p className="text-sm mb-0">
                                              {ungTuyenVien?.sdt}
                                            </p>
                                            <p className="text-sm mb-0">
                                              {ungTuyenVien?.taiKhoan?.email}
                                            </p>
                                            <p className="address">
                                              <span className="created">
                                                Ngày nộp:{" "}
                                                {TimeUtils.formatDateTime(
                                                  item?.ngayUngTuyen,
                                                  "DD-MM-YYYY"
                                                )}
                                              </span>
                                            </p>
                                            <p>
                                              <Link
                                                to={`/job-detail/${item._id}`}
                                                target="_blank"
                                              >
                                                Xem thông tin ứng tuyến viên
                                              </Link>
                                            </p>
                                          </td>
                                          <td className="">
                                            <p className="text-sm fw-bold mb-0">
                                              {tinTuyenDung?.tieuDe}
                                            </p>
                                            <p className="text-sm mb-0">
                                              Số lượng tuyển :{" "}
                                              {tinTuyenDung?.soLuongTuyen}
                                            </p>
                                            <p className="text-sm mb-0">
                                              Số lượng đã tuyển:{" "}
                                              {tinTuyenDung?.soLuongDaTuyen}
                                            </p>

                                            <p className="text-sm mb-0">
                                              Khu vực:{" "}
                                              {tinTuyenDung?.diaDiem
                                                ?.tinhThanhPho +
                                                "-" +
                                                tinTuyenDung?.diaDiem
                                                  ?.quanHuyen}
                                            </p>
                                            <p className="text-sm mb-0">
                                              Ngày hết hạn:{" "}
                                              {TimeUtils.formatDateTime(
                                                tinTuyenDung?.ngayHetHan,
                                                "DD-MM-YYYY"
                                              )}{" "}
                                            </p>
                                          </td>
                                          <td className="text-center align-middle">
                                            <span>{trangThai}</span>
                                          </td>
                                          <td
                                            className=" cursor-pointer pointer align-middle"
                                            // onClick={(e) => {
                                            //   console.log("e", e);
                                            // }}
                                          >
                                            {/* <span className="text-xs font-weight-bold pointer">
                                              <FaEllipsisV />
                                            </span> */}
                                            <div class="dropdown">
                                              <button
                                                class="btn btn-secondary dropdown-toggle"
                                                type="button"
                                                id="dropdownMenuButton1"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                Chi tiết
                                              </button>
                                              <ul
                                                class="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton1"
                                              >
                                                <li
                                                  onClick={() => {
                                                    handleAddButtonClickProfile(
                                                      item
                                                    );
                                                  }}
                                                >
                                                  <span class="dropdown-item">
                                                    Xem
                                                  </span>
                                                </li>
                                                <li>
                                                  <span class="dropdown-item">
                                                    Ứng tuyển viên năng
                                                  </span>
                                                </li>
                                                <li>
                                                  <span class="dropdown-item">
                                                    Xóa
                                                  </span>
                                                </li>
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
                              Không có dữ liệu
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
                                className={`page-item ${
                                  page <= 1 ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  type="button"
                                  className="page-link"
                                  disabled={page <= 1}
                                  onClick={() => {
                                    prevPage();
                                  }}
                                >
                                  Trang truớc
                                </button>
                              </li>
                              <li
                                className={`page-item ${
                                  page >= totalCount ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  type="button"
                                  disabled={page >= totalCount}
                                  onClick={() => {
                                    nextPage();
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
                    <TabPane tab={`Đang ứng tuyển (${totalDangUT})`} key="1">
                      <div className="row">
                        <div className="col-2">
                          <PostFiltersForm onSubmit={handleFiltersChange} />
                        </div>
                        <div className="col-2">
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Thời gian nộp đơn"
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
                            <Option value="jack">Đăng gần nhất</Option>
                            <Option value="lucy">Đăng cũ nhất</Option>
                          </Select>
                        </div>
                        {/* <div className="col-1 me-3">
                          <Button
                            style={{ width: "120px" }}
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            icon={<SearchOutlined />}
                          >
                            Tìm kiếm
                          </Button>
                        </div> */}
                        <div className="col-1 ms-3">
                          <Button
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            // icon={<GrFormRefresh />}
                            onClick={() => {
                              window.location.reload();
                            }}
                          >
                            Làm mới
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
                                        <strong> Thông tin ứng viên</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                        <strong>Tin tuyển dụng</strong>
                                      </th>
                                      <th className="text-secondary text-center opacity-7 ps-2 text-center text-white py-3">
                                        <strong> Trạng thái</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                        <strong>Chi tiết</strong>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {recruitments.map((item, index) => {
                                      return (
                                        <tr key={index + 1}>
                                          <td className="align-middle">
                                            <p className="text-sm font-weight-bold mb-0 text-center">
                                              {index}
                                            </p>
                                          </td>
                                          <td>
                                            <p className="text-sm fw-bold mb-0">
                                              {item?.tieuDe}
                                            </p>
                                            <p className="text-sm mb-0">
                                              {item?.diaDiem?.tinhThanhPho} :{" "}
                                              {item?.diaDiem?.quanHuyen}
                                            </p>
                                            <p className="address">
                                              <span className="created">
                                                Ngày tạo:{" "}
                                                {TimeUtils.formatDateTime(
                                                  item?.ngayTao,
                                                  "DD-MM-YYYY"
                                                )}
                                              </span>
                                              &nbsp;
                                              <span className="apply-date">
                                                Hạn nộp:{" "}
                                                {TimeUtils.formatDateTime(
                                                  item?.ngayHetHan,
                                                  "DD-MM-YYYY"
                                                )}
                                              </span>
                                            </p>
                                            <p>
                                              <Link
                                                to={`/job-detail/${item._id}`}
                                                target="_blank"
                                              >
                                                Xem thông tin ứng tuyến viên
                                              </Link>
                                            </p>
                                          </td>
                                          <td className="align-middle">
                                            <span className="text-xs font-weight-bold d-flex align-items-center  text-center">
                                              <FaUserPlus className="text-danger" />{" "}
                                              &nbsp; 1 hồ sơ mới
                                            </span>
                                          </td>
                                          <td className="text-center align-middle">
                                            <span>{item?.trangThai}</span>
                                          </td>
                                          <td
                                            className="text-center cursor-pointer align-middle pointer"
                                            onClick={(e) => {
                                              console.log("e", e);
                                            }}
                                          >
                                            <span className="text-xs font-weight-bold pointer">
                                              <FaEllipsisV />
                                            </span>
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
                              Không có dữ liệu
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
                                className={`page-item ${
                                  page <= 1 ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  type="button"
                                  className="page-link"
                                  disabled={page <= 1}
                                  onClick={() => {
                                    prevPage();
                                  }}
                                >
                                  Trang truớc
                                </button>
                              </li>
                              <li
                                className={`page-item ${
                                  page >= totalCount ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  type="button"
                                  disabled={page >= totalCount}
                                  onClick={() => {
                                    nextPage();
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
                    <TabPane tab={`Đã ứng tuyển (${totalDaUT})`} key="2">
                      <div className="row">
                        <div className="col-2">
                          <PostFiltersForm onSubmit={handleFiltersChange} />
                        </div>
                        <div className="col-2">
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Thời gian tạo"
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
                            <Option value="jack">Đăng gần nhất</Option>
                            <Option value="lucy">Đăng cũ nhất</Option>
                          </Select>
                        </div>
                        {/* <div className="col-1 me-3">
                          <Button
                            style={{ width: "120px" }}
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            icon={<SearchOutlined />}
                          >
                            Tìm kiếm
                          </Button>
                        </div> */}
                        <div className="col-1 ms-3">
                          <Button
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            // icon={<GrFormRefresh />}
                            onClick={() => {
                              window.location.reload();
                            }}
                          >
                            Làm mới
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
                                        <strong> Thông tin ứng viên</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                        <strong>Tin tuyển dụng</strong>
                                      </th>
                                      <th className="text-secondary text-center opacity-7 ps-2 text-center text-white py-3">
                                        <strong> Trạng thái</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                        <strong>Chi tiết</strong>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {recruitments.map((item, index) => {
                                      return (
                                        <tr key={index + 1}>
                                          <td className="align-middle">
                                            <p className="text-sm font-weight-bold mb-0 text-center">
                                              {index}
                                            </p>
                                          </td>
                                          <td>
                                            <p className="text-sm fw-bold mb-0">
                                              {item?.tieuDe}
                                            </p>
                                            <p className="text-sm mb-0">
                                              {item?.diaDiem?.tinhThanhPho} :{" "}
                                              {item?.diaDiem?.quanHuyen}
                                            </p>
                                            <p className="address">
                                              <span className="created">
                                                Ngày tạo:{" "}
                                                {TimeUtils.formatDateTime(
                                                  item?.ngayTao,
                                                  "DD-MM-YYYY"
                                                )}
                                              </span>
                                              &nbsp;
                                              <span className="apply-date">
                                                Hạn nộp:{" "}
                                                {TimeUtils.formatDateTime(
                                                  item?.ngayHetHan,
                                                  "DD-MM-YYYY"
                                                )}
                                              </span>
                                            </p>
                                            <p>
                                              <Link
                                                to={`/job-detail/${item._id}`}
                                                target="_blank"
                                              >
                                                Xem thông tin ứng tuyến viên
                                              </Link>
                                            </p>
                                          </td>
                                          <td className="align-middle">
                                            <p className="text-sm fw-bold mb-0">
                                              {item?.tieuDe}
                                            </p>
                                            <p className="text-sm mb-0">
                                              {item?.diaDiem?.tinhThanhPho} :{" "}
                                              {item?.diaDiem?.quanHuyen}
                                            </p>
                                          </td>
                                          <td className="text-center align-middle">
                                            <span>{item?.trangThai}</span>
                                          </td>
                                          <td
                                            className="text-center cursor-pointer align-middle pointer"
                                            onClick={(e) => {
                                              console.log("e", e);
                                            }}
                                          >
                                            <span className="text-xs font-weight-bold pointer">
                                              <FaEllipsisV />
                                            </span>
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
                              Không có dữ liệu
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
                                className={`page-item ${
                                  page <= 1 ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  type="button"
                                  className="page-link"
                                  disabled={page <= 1}
                                  onClick={() => {
                                    prevPage();
                                  }}
                                >
                                  Trang truớc
                                </button>
                              </li>
                              <li
                                className={`page-item ${
                                  page >= totalCount ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  type="button"
                                  disabled={page >= totalCount}
                                  onClick={() => {
                                    nextPage();
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
                    <TabPane tab={`Từ chối(${totalTuChoi})`} key="3">
                      <div className="row">
                        <div className="col-2">
                          <PostFiltersForm onSubmit={handleFiltersChange} />
                        </div>
                        <div className="col-2">
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Thời gian tạo"
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
                            <Option value="jack">Đăng gần nhất</Option>
                            <Option value="lucy">Đăng cũ nhất</Option>
                          </Select>
                        </div>
                        {/* <div className="col-1 me-3">
                          <Button
                            style={{ width: "120px" }}
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            icon={<SearchOutlined />}
                          >
                            Tìm kiếm
                          </Button>
                        </div> */}
                        <div className="col-1 ms-3">
                          <Button
                            className="d-flex align-items-center justify-content-center"
                            type="primary"
                            // icon={<GrFormRefresh />}
                            onClick={() => {
                              window.location.reload();
                            }}
                          >
                            Làm mới
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
                                        <strong> Thông tin ứng viên</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2 text-white py-3">
                                        <strong>Tin tuyển dụng</strong>
                                      </th>
                                      <th className="text-secondary text-center opacity-7 ps-2 text-center text-white py-3">
                                        <strong> Trạng thái</strong>
                                      </th>
                                      <th className="text-secondary opacity-7 ps-2 text-center text-white py-3">
                                        <strong>Chi tiết</strong>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {recruitments.map((item, index) => {
                                      return (
                                        <tr key={index + 1}>
                                          <td className="align-middle">
                                            <p className="text-sm font-weight-bold mb-0 text-center">
                                              {index}
                                            </p>
                                          </td>
                                          <td>
                                            <p className="text-sm fw-bold mb-0">
                                              {item?.tieuDe}
                                            </p>
                                            <p className="text-sm mb-0">
                                              {item?.diaDiem?.tinhThanhPho} :{" "}
                                              {item?.diaDiem?.quanHuyen}
                                            </p>
                                            <p className="address">
                                              <span className="created">
                                                Ngày tạo:{" "}
                                                {TimeUtils.formatDateTime(
                                                  item?.ngayTao,
                                                  "DD-MM-YYYY"
                                                )}
                                              </span>
                                              &nbsp;
                                              <span className="apply-date">
                                                Hạn nộp:{" "}
                                                {TimeUtils.formatDateTime(
                                                  item?.ngayHetHan,
                                                  "DD-MM-YYYY"
                                                )}
                                              </span>
                                            </p>
                                            <p>
                                              <Link
                                                to={`/job-detail/${item._id}`}
                                                target="_blank"
                                              >
                                                Xem thông tin ứng tuyến viên
                                              </Link>
                                            </p>
                                          </td>
                                          <td className="align-middle">
                                            <span className="text-xs font-weight-bold d-flex align-items-center  text-center">
                                              <FaUserPlus className="text-danger" />{" "}
                                              &nbsp; 1 hồ sơ mới
                                            </span>
                                          </td>
                                          <td className="text-center align-middle">
                                            <span>{item?.trangThai}</span>
                                          </td>
                                          <td
                                            className="text-center cursor-pointer align-middle pointer"
                                            onClick={(e) => {
                                              console.log("e", e);
                                            }}
                                          >
                                            <span className="text-xs font-weight-bold pointer">
                                              <FaEllipsisV />
                                            </span>
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
                              Không có dữ liệu
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
                                className={`page-item ${
                                  page <= 1 ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  type="button"
                                  className="page-link"
                                  disabled={page <= 1}
                                  onClick={() => {
                                    prevPage();
                                  }}
                                >
                                  Trang truớc
                                </button>
                              </li>
                              <li
                                className={`page-item ${
                                  page >= totalCount ? "disabled drop" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  type="button"
                                  disabled={page >= totalCount}
                                  onClick={() => {
                                    nextPage();
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
            {renderModalProfile}
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
export default AllProfilePage;
