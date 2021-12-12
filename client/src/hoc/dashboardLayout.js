import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import './dashboardLayout.scss';
import { MdOutlineAccountBalanceWallet, MdOutlineAccountCircle } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { IoMdCart } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";

import './dashboardLayOut.css'

export const links = [
  {
    name: 'My account',
    linkTo: '/dashboard'
  },
  {
    name: 'User Information',
    linkTo: '/dashboard/user/user_info'
  },
  {
    name: 'My Cart',
    linkTo: '/dashboard/user/user_cart'
  },
];

export const admin = [
  {
    name: 'Products',
    linkTo: '/dashboard/admin/admin_products'
  },
  {
    name: 'Manage Site',
    linkTo: '/dashboard/admin/manage_site'
  }
]




const DashboardLayout = (props) => {

  const users = useSelector(state => state.users);

  return (
    <>
      <div className="user_container">
        {/* <div className="user_left_nav"> */}
        
          <ProSidebar
            // collapsed={false}
            // breakPoint="md"
            onToggle={() => {}}
          >
            <SidebarHeader
              style={{
                padding: "24px",
                textTransform: "uppercase",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "22px",
                letterSpacing: "1px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Dashboard
            </SidebarHeader>
            <SidebarContent
              style={{
                fontFamily: "Roboto",
                fontWeight: "bold",
                paddingLeft: "1.2rem",
              }}
            >
              <Menu iconShape="round" style={{ marginTop: "50px" }}>
                <MenuItem icon={<MdOutlineAccountBalanceWallet />}>
                  Account Information
                  <Link to="/dashboard" />
                </MenuItem>
                <MenuItem
                  icon={<MdOutlineAccountCircle />}
                  style={{ marginTop: "15px" }}
                >
                  My Profile
                  <Link to="/dashboard/user/user_info" />
                </MenuItem>
                <MenuItem icon={<IoMdCart />} style={{ marginTop: "15px" }}>
                  My Cart
                  <Link to="/dashboard/user/user_cart" />
                </MenuItem>
                

              </Menu>

              <Menu iconShape="circle"></Menu>
              <Menu iconShape="circle"></Menu>
              <Menu iconShape="circle"></Menu>
              <Menu iconShape="circle"></Menu>

              {users.data.role === "admin" ? (
                <Menu iconShape="circle">
                  <MenuItem icon={<FaBoxes />}>
                    Products
                    <Link to="/dashboard/admin/admin_products" />
                  </MenuItem>
                  <MenuItem
                    icon={<BsPeopleFill />}
                    style={{ marginTop: "15px" }}
                  >
                    Customers
                    <Link to="/dashboard/admin/admin_customers" />
                  </MenuItem>
                  <MenuItem
                    icon={<AiFillSetting />}
                    style={{ marginTop: "15px" }}
                  >
                    Manage Site
                    <Link to="/dashboard/admin/manage_site" />
                  </MenuItem>
                </Menu>
              ) : null}
            </SidebarContent>
          </ProSidebar>
        
        {/* </div> */}
        <div className="user_right">
          <div className="dashboard_title">
            <h1>{props.title}</h1>
          </div>
          {props.children}
        </div>
      </div>
    </>
  );

}

export default DashboardLayout;