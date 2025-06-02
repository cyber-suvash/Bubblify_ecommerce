import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Footer3 from "../Footer3";

const AppLayout = ({
  wishlist = { wishlist },
  isLoggedIn = { isLoggedIn },
  handleLogout = { handleLogout },
  setUser = { setUser },
  user = { user },
  profile_img = { profile_img }
}) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const handleSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  return (
    <>
      <Header
        isOpenSidebar={isOpenSidebar}
        handleSidebar={handleSidebar}
        wishlist={wishlist}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        setUser={setUser}
        user={user}
        profile_img={profile_img}
      />
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <Outlet />
        </main>
      </div>
      <Footer3 />
    </>
  );
};

export default AppLayout;
