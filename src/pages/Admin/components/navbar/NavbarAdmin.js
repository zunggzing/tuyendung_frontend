import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { FaListUl } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/actions/authActions";
import { toast } from "react-toastify";
const { Header, Content, Footer, Sider } = Layout;

const NavbarAdmin = (props) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Đăng xuất thành công", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <Fragment>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item icon={<DesktopOutlined />} key="1">
            Trang chủ
            <Link to="/employer/dashboard" />
          </Menu.Item>
          <Menu.SubMenu title="Tin tuyển dụng" icon={<FaListUl />} key="sub1">
            <Menu.Item key="2">
              Quản lý tin
              <Link to="/employer/dashboard" />
            </Menu.Item>
            <Menu.Item key="3">
              Thêm mới tin
              <Link to="/employer/job/create" />
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            title="Hồ sơ ứng tuyển"
            icon={<TeamOutlined />}
            key="sub2"
          >
            <Link to="/employer/job/apply-job/all" />
            <Menu.Item key="4">
              Tất cả hồ sơ
              <Link to="/employer/job/apply-job/all" />
            </Menu.Item>
            <Menu.Item key="5">
              Hồ sơ tiềm năng
              <Link to="/employer/job/apply-job/talent" />
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item icon={<DesktopOutlined />} key="6">
            Thông tin công ty
            <Link to="/employer/account/profile" />
          </Menu.Item>
          <Menu.Item icon={<GoSignOut />} key="7" onClick={logoutHandler}>
            Đăng xuất
            <Link to="/" />
          </Menu.Item>
        </Menu>
      </Sider>
    </Fragment>
  );
};

NavbarAdmin.propTypes = {};

export default NavbarAdmin;
