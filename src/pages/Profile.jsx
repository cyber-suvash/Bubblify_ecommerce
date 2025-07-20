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
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { toast } from "react-hot-toast";
import axios from "axios";

const Profile = ({
  user,
  isLoggedIn,
  handleLogout,
  setUser,
  getImage,
  profile_img,
}) => {
  const API_URL = import.meta.env.VITE_SERVER_URL;
  // const API_URL=`http://localhost:3000`
  const [loader, setLoader] = useState(false);
  const [profile, setProfile] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const img_ref = useRef(null); // refecrence of image
  const handleClear = () => {
    if (img_ref.current) {
      img_ref.current.value = null;
      setProfile(null);
      // toast.success("cleared");
    }
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();

    if (!updatedName.trim() && profile === null) {
      return toast.error("please select an image or enter a name to update");
    }
    const formdata = new FormData();
    if (profile) {
      formdata.append("profile_img", profile);
    }
    formdata.append("userId", user._id);
    if (updatedName.trim()) {
      formdata.append("fullname", updatedName.trim());
    }
    try {
      setLoader(true);
      const response = await fetch(`${API_URL}/api/images/upload`, {
        method: "PUT",
        body: formdata,
      });

      const result = await response.json();
      console.log(result);
      if (response.status === 200) {
        toast.success(result.msg || "Profile successfully updated.");
        setUser(result.user);
        await getImage();
        handleClear();
      } else {
        toast.error(result.msg || "Upload image failed!");
      }
    } catch (error) {
      toast.error("Internal issue");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (user?.fullname) {
      setUpdatedName(user.fullname);
    }
  }, [user]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="container pt-5 mt-5">
            <div className="row">
              <div className="col-md-6 mb-3">
                <Card sx={{ maxWidth: 350 }} className="m-auto ">
                  <CardMedia
                    component="img"
                    alt="profile-picture"
                    image={profile_img}
                    sx={{
                      height: 250,
                      width: 250,
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                      margin: "0 auto",
                      outline: "1px solid gray", // center horizontally
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
                  <CardActions>
                    <Link to={"/"}>
                      <Button>
                        <ArrowBackRoundedIcon /> Back
                      </Button>
                    </Link>

                    <Button
                      className="bg-danger text-white"
                      onClick={handleLogout}
                    >
                      <LogoutIcon /> Logout
                    </Button>
                  </CardActions>
                </Card>
              </div>
              <div className="col-md-6 mb-3">
                <Card>
                  <Typography variant="h5" color="textPrimary">
                    profile update
                  </Typography>
                  <CardContent>
                    <TextField
                      className="mb-3"
                      value={updatedName}
                      onChange={(e) => setUpdatedName(e.target.value)}
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

                      {loader ? (
                        <CircularProgress size={30} color="white" />
                      ) : (
                        <div className="mb-3">
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
                            submit
                          </Button>
                        </div>
                      )}
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
