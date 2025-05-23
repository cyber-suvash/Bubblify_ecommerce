import React, { useState } from "react";
import logo from "../assets/photos/logo.png";
import Avatar from "@mui/material/Avatar";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import OrderIcon from "@mui/icons-material/Description";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PaymentIcon from "@mui/icons-material/Payment";
import SmsIcon from "@mui/icons-material/Sms";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReportIcon from "@mui/icons-material/Report";
import TimelineIcon from "@mui/icons-material/Timeline";
import HistoryIcon from "@mui/icons-material/History";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";


const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => {
    setOpen(!open);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className="admin-sidebar">
      {/* <div className="mobile-header d-lg-none ">
        <div className="container ">
          <div className="d-flex justify-content-between align-items-center">
            <IconButton
              onClick={toggleSidebar}
              className="menu-icon"
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Link to="/">
              <img src={logo} alt="logo_img" className="mobile-logo" />
            </Link>

            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="border-0 bg-transparent"
              >
                <Avatar
                  alt="Admin Avatar"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 40, height: 40 }}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="custom-dropdown-menu p-1"
                style={{ minWidth: "240px" }}
              >
                <Dropdown.Header>
                  <Avatar
                    alt="Admin Avatar"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 40, height: 40 }}
                  />
                  <div>
                    <h4>Name here</h4>
                    <span>testadmin@gmail.com</span>
                  </div>
                </Dropdown.Header>
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item href="#/profile">
                  <PersonIcon />
                  Profile
                </Dropdown.Item>
                <Dropdown.Item href="/settings">
                  <SettingsIcon />
                  Settings
                </Dropdown.Item>
                <Dropdown.Item href="/logout">
                  <LogoutIcon />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div> */}
      <IconButton
        onClick={toggleSidebar}
        className="menu-icon"
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      {/* drawer component sidebar */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleSidebar}
        variant={isSmallScreen ? "temporary" : "permanent"}
      >
        {open ? (
          <CancelIcon
            onClick={toggleSidebar}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "red",
            }}
          />
        ) : (
          ""
        )}
        <div>
          <img src={logo} alt="logo" className="dash-logo" />

          <h3>Overview</h3>
          <div className="d-flex flex-column">
            <Button
              className="text-start"
              startIcon={<DonutLargeIcon />}
              fullWidth
            >
              Dashboard
            </Button>
            <Button className="text-start" startIcon={<OrderIcon />} fullWidth>
              Orders
            </Button>
            <Button
              className="text-start"
              startIcon={<InventoryIcon />}
              fullWidth
            >
              Products
            </Button>
            <Button
              className="text-start"
              startIcon={<PeopleAltIcon />}
              fullWidth
            >
              Customers
            </Button>
            <Button
              className="text-start"
              startIcon={<PaymentIcon />}
              fullWidth
            >
              Finance
            </Button>
          </div>
        </div>

        <div>
          <h3>Management</h3>
          <div className="d-flex flex-column">
            <Button className="text-start" startIcon={<SmsIcon />} fullWidth>
              Messages
            </Button>
            <Button
              className="text-start"
              startIcon={<CalendarMonthIcon />}
              fullWidth
            >
              Calendar
            </Button>
            <Button
              className="text-start"
              startIcon={<TimelineIcon />}
              fullWidth
            >
              Report
            </Button>
          </div>
        </div>

        <div>
          <h3>Support</h3>
          <div className="d-flex flex-column">
            <Button
              className="text-start"
              startIcon={<HistoryIcon />}
              fullWidth
            >
              History
            </Button>
            <Button className="text-start" startIcon={<ReportIcon />} fullWidth>
              Help & Support
            </Button>
          </div>
        </div>

        <Avatar
          alt="Admin Avatar"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 50, height: 50 }}
        />
      </Drawer>
    </div>
  );
};

export default AdminSidebar;
