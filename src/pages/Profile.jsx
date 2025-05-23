import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import image from "../assets/photos/goku.jpg";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { toast, Toaster } from "react-hot-toast";
import Header from "../components/Header";

const Profile = ({
  user,
  isLoggedIn,
  handleLogout,
  setUser,
  getImages,
  profile_img,
}) => {
  const [loader, setLoader] = useState(false);
  const [profile, setProfile] = useState(null);
  const [updateData, setUpdateData] = useState("");

  const img_ref = useRef(null); // refecrence of image

  const handleClear = () => {
    if (img_ref.current) {
      img_ref.current.value = null;
      setProfile(null);
      toast.success("input cleared");
    }
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();

    if (!updateData.trim() && !profile) {
      return toast.error("please select an image or enter a name to update");
    }
    const formdata = new FormData();
    if (profile) {
      formdata.append("profile_img", profile);
    }
    formdata.append("userId", user._id);
    if (updateData.trim()) {
      formdata.append("fullname", updateData.trim());
    }

    try {
      setLoader(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/images/upload`, {
        method: "PUT",
        body: formdata,
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.msg || "Profile successfully updated.");
        console.log(result);
        setUser(result.user);
        await getImages();
        handleClear();
      } else {
        toast.error("Upload image failed!");
      }
    } catch (error) {
      toast.error("internal server error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (user?.fullname) {
      setUpdateData(user.fullname);
    }
  }, [user]);

  return (
    <>
      <Header> </Header>
      {isLoggedIn ? (
        <>
          <Toaster />
          <div className="container mt-5 pt-2">
            <div className="row">
              <div className="col-md-6">
                <Card sx={{ maxWidth: 345 }} className="m-auto">
                  <CardMedia
                    component="img"
                    alt="profile"
                    image={profile_img || image}
                    sx={{
                      width: 200,
                      height: 200,
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                      margin: "0 auto", // center horizontally
                    }}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Name ~ {user?.fullname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email ~ {user?.email}
                    </Typography>
                  </CardContent>

                  {/* <CardActions>
                    <div>
                      {" "}
                      <Button className="mb-2 sidebar-link">
                        <HistoryIcon />
                        Order History
                      </Button>
                      <Button className="mb-2 sidebar-link">
                        <FavoriteIcon /> Wishlist
                      </Button>
                      <Button className="mb-2 sidebar-link">
                        <HomeIcon /> Address
                      </Button>
                      <Button className="mb-2 sidebar-link">
                        <SettingsIcon /> Profile Settings
                      </Button>
                    </div>
                  </CardActions> */}
                  <CardActions>
                    <Link to={"/"}>
                      <Button className="mb-2 ">
                        <ArrowBackRoundedIcon /> Back
                      </Button>
                    </Link>

                    <Button
                      className="mb-2 bg-danger text-white"
                      onClick={handleLogout}
                    >
                      <LogoutIcon /> Logout
                    </Button>
                  </CardActions>
                </Card>
              </div>
              <div className="col-md-6">
                <Card>
                  <Typography variant="h5" color="textPrimary">
                    profile update
                  </Typography>
                  <CardContent>
                    <TextField
                      className="mb-3"
                      value={updateData}
                      onChange={(e) => setUpdateData(e.target.value)}
                      fullWidth
                      name="fullname"
                      label="Name"
                    />
                    <TextField
                      className="mb-2"
                      fullWidth
                      disabled
                      value={user.email}
                      sx={{ input: { color: "" } }}
                    />

                    <form action="" onSubmit={handleUploadImage}>
                      <label htmlFor="" className="">
                        Upload your image
                      </label>
                      <input
                        className="w-100 mb-3"
                        type="file"
                        name="profile_img"
                        id="profile_img"
                        accept="image/*"
                        ref={img_ref}
                        onChange={(e) => setProfile(e.target.files[0])}
                      />
                      <Button
                        type="button"
                        onClick={handleClear}
                        className="bg-secondary text-white me-3 px-3"
                      >
                        clear
                      </Button>
                      <Button
                        type="submit"
                        className="bg-success text-white px-3"
                      >
                        {loader ? (
                          <CircularProgress size={24} color="white" />
                        ) : (
                          "submit"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Typography variant="h6" align="center" mt={5}>
          Please log in to view your profile.
        </Typography>
      )}
    </>
  );
};

export default Profile;