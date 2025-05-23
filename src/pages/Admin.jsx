import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../dashboard/AdminSidebar";
import "../dashboard/Admin.css";
import Avatar from "@mui/material/Avatar";
import Dropdown from "react-bootstrap/Dropdown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import Badge from "@mui/material/Badge";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";
import Listing from "../components/Listing";


const date = new Date();

const Admin = () => {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <div className="col-md-2 p-0 bg-light col">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-10 bg-warning d-flex flex-column p-0">
          {/* Top Navbar */}
          <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
            <div className="container-fluid d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                
                <Link
                  to="/admin-dashboard"
                  className="navbar-brand text-primary"
                >
                  Dashboard
                </Link>
              </div>

              <form className="d-none d-md-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>

              <div className="d-flex align-items-center gap-3">
                <Button>
                  <Badge badgeContent={4} color="primary">
                    <NotificationsIcon color="action" />
                  </Badge>
                </Button>
                <Button>
                  <SettingsIcon />
                </Button>

                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="light"
                    className="border-0 bg-transparent"
                    id="dropdown-basic"
                  >
                    <Avatar
                      alt="Admin Avatar"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 40, height: 40 }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    className="custom-dropdown-menu p-2"
                    style={{ minWidth: "240px" }}
                  >
                    <Dropdown.Header className="d-flex align-items-center gap-2">
                      <Avatar
                        alt="Admin Avatar"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 40, height: 40 }}
                      />
                      <div>
                        <h6 className="mb-0">Name here</h6>
                        <small>testadmin@gmail.com</small>
                      </div>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/profile">
                      <PersonIcon className="me-2" /> Profile
                    </Dropdown.Item>
                    <Dropdown.Item href="/settings">
                      <SettingsIcon className="me-2" /> Settings
                    </Dropdown.Item>
                    <Dropdown.Item href="/logout">
                      <LogoutIcon className="me-2" /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <div className="d-none d-md-flex flex-column ms-2">
                  <span>Name here</span>
                  <span className="text-secondary">Admin</span>
                </div>
              </div>
            </div>
          </nav>

          {/* Page Content */}
          <div className="px-3 py-2">
            <div className="row bg-success">
              <div className="col-md-5">
                <div className="d-block mb-3 ">{date.toDateString()}</div>
                <div>
                  <Button variant="contained" className="mb-3">
                    Create
                  </Button>
                </div>
              </div>
            </div>
            <div className="row bg-danger p-2 gap-4 rounded">
              <div className="col-md-3 bg-white rounded p-3">
              <h4>Total orders</h4>
              <h2>50</h2>

              </div>
              <div className="col-md-3 bg-success rounded p-3">
               <h4>Total customers</h4>
               <h2>500</h2>
              </div>
              <div className="col-md-3 bg-success rounded p-3">
             <h4>Total products</h4>
             <h2>800</h2>
              </div>
            </div>

            <div><Listing/></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
