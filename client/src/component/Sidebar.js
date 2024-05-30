import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import Logo from "../component/photo/lg.png";

const Sidebars = () => {
  return (
    <div
      style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
    >
      <CDBSidebar textColor="#161515" backgroundColor="#efeded" >
        <CDBSidebarHeader style={{ padding: '1px 1px' }} prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}

          >
            <img src={Logo} alt="Logo" style={{ height: '45px' }} />
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/admin/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/register" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Đăng ký tài khoản</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/patient" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Danh sách bệnh nhân</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/doctor_list" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Danh sách bác sĩ</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

      </CDBSidebar>
    </div>
  );
};

export default Sidebars;
