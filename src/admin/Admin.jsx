import React, { useState,useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";
import Avatar from "@mui/material/Avatar";
import Dropdown from "react-bootstrap/Dropdown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import Badge from "@mui/material/Badge";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";
import CreateProduct from "./CreateProduct";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { AdminProductContext } from "../context/AdminContex";

const date = new Date();
const Admin = ({ user, handleLogout, profile_img }) => {
  const [isopen, setIsopen] = useState(false);
  const toggleSidebar = () => {
    setIsopen(!isopen);
  };
  const [BootModal, setBootModal] = useState(false);
  const {products}=useContext(AdminProductContext);

  return (
    <div className="container-fluied px-3 ">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <AdminSidebar isopen={isopen} toggleSidebar={toggleSidebar} />
        {/* Main Content */}
        <div className=" col-12 col-md-10 d-flex flex-column p-0">
          {/* Top Navbar */}
          <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
            <div className="container-fluid d-flex justify-content-between align-items-center">
              <IconButton
                onClick={toggleSidebar}
                className="menu-icon"
                sx={{ display: { xs: "block", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <div className="d-flex align-items-center gap-3">
                <Link to="/admin" className="navbar-brand text-primary ">
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
                      src={profile_img}
                      sx={{ width: 60, height: 60 }}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="custom-dropdown-menu p-2"
                    style={{ minWidth: "240px" }}
                  >
                    <Dropdown.Header className="d-flex align-items-center gap-2">
                      <Avatar
                        alt="Admin Avatar"
                        src={profile_img}
                        style={{ objectFit: "cover" }}
                        sx={{}}
                      />
                      <div>
                        <h6 className="mb-0">{user.fullname}</h6>
                        <small>{user.email}</small>
                        <p className="mb-0">
                          {user.role === "admin" ? "Admin" : ""}
                        </p>
                      </div>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item as={Link} to="/profile">
                      <PersonIcon className="me-2" /> Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/settings">
                      <SettingsIcon className="me-2" /> Settings
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>
                      <LogoutIcon className=" text-danger me-2" /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* <div className="d-none d-md-flex flex-column ms-2">
                  <span>{user.fullname}</span>
                  <span className="text-secondary">
                    {user.role ? "Admin" : ""}
                  </span>
                </div> */}
              </div>
            </div>
          </nav>

          {/* Page Content */}
          <div className="px-3 py-2">
            <div className="row ">
              <div className="col-md-5">
                <div className="d-block mb-3 ">{date.toDateString()}</div>
                <div>
                  <Button
                    variant="contained"
                    className="mb-3"
                    onClick={() => setBootModal(true)}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
            <div className="row  p-2 gap-4 rounded ">
              <div className="col-md-3 bg-danger text-white rounded p-3">
                <h4>Total orders</h4>
                <h2>50</h2>
              </div>
              <div className="col-md-3 bg-success rounded text-white p-3">
                <h4>Total customers</h4>
                <h2>500</h2>
              </div>
              <div className="col-md-3 bg-secondary rounded p-3 text-white ">
                <h4>Total products</h4>
                <h2>{products.length}</h2>
              </div>
            </div>
            <CreateProduct BootModal={BootModal} setBootModal={setBootModal} />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
