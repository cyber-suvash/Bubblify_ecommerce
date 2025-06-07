import React, { useState } from "react";
import logo from "/photos/logo.png";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import OrderIcon from "@mui/icons-material/Description";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
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

const AdminSidebar = ({ toggleSidebar, isopen }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div className="admin-sidebar">
      {/* drawer component sidebar */}
      <Drawer
        anchor="left"
        open={isopen}
        onClose={toggleSidebar}
        variant={isSmallScreen ? "temporary" : "permanent"}
      >
        {isopen ? (
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
          <div className="d-flex flex-column gap-2">
            <Link to={"/admin-dashboard"}>
              <Button
                className={`active`}
                fullWidth
                startIcon={<DonutLargeIcon />}
              >
                Dashboard
              </Button>
            </Link>
            <Link to={"orders"}>
              <Button className="" startIcon={<OrderIcon />} fullWidth>
                Orders
              </Button>
            </Link>

            <Link to="products">
              <Button
                className={`text-start`}
                startIcon={<InventoryIcon />}
                fullWidth
              >
                Products
              </Button>
            </Link>

            <Link to={"customers"}>
              <Button
                className="text-start"
                startIcon={<PeopleAltIcon />}
                fullWidth
              >
                Customers
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <div className="d-flex flex-column">
           
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
         
          <div className="d-flex flex-column">
            <Link to={'history'}>
             <Button
              className="text-start"
              startIcon={<HistoryIcon />}
              fullWidth>
              History
            </Button>
            </Link>
           
            <Button className="text-start" startIcon={<ReportIcon />} fullWidth>
              Help & Support
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default AdminSidebar;
