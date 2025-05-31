import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";
import EditProduct from "./EditProduct";

const Listing = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [loading, setLoading] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [fetchProduct, setFetchProduct] = useState([]);

  const [targetElement, settargetElement] = useState(null);

  const callProductData = async () => {
    setLoading(true);
    try {
      await delay(2000);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/products`
      );
      console.log(res);
      if (res.status === 200 && res.data) {
        const product = res.data.data;

        console.log(product);

        setFetchProduct([...product]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    callProductData();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/products/${id}`
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Product deleted", { duration: 3000 });
        setFetchProduct(fetchProduct.filter((each) => each._id !== id));
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error, please try later");
    } finally {
    }
  };

  const handleIDset = (id) => {
    const one = fetchProduct.find((each) => each._id === id);

    if (one) {
      settargetElement(one);
      console.log(one._id);
    } else {
      console.log("prodcut not found");
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center mt-5">
          <CircularProgress />
          <p>Loading products...</p>
        </div>
      ) : fetchProduct.length > 0 ? (
        <>
          <div className="row p-2 ">
            <div className="col rounded bg-success text-white py-3">
              <h4>Product List</h4>
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-success table-sm-fs-6">
                  <thead>
                    <tr className="table-info ">
                      <th>#Id</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stocks</th>
                      <th>Review</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchProduct.map((each, idx) => (
                      <tr key={each._id}>
                        <td>{idx + 1}</td>
                        <td>
                          <img
                            src={each.image || "https://via.placeholder.com/50"}
                            alt="product"
                            width="60"
                          />
                        </td>
                        <td>{each.product_name}</td>
                        <td>{each.category}</td>
                        <td>{each.price}</td>
                        <td>{each.availability}</td>
                        <td>
                          <Rating name="read-only" value={3} readOnly />
                        </td>
                        <td>
                          <IconButton
                            onClick={() => handleDeleteProduct(each._id)}
                          >
                            <DeleteForeverIcon sx={{ color: "crimson" }} />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() => {
                              handleIDset(each._id);
                              handleShow();
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <EditProduct
            show={show}
            handleClose={handleClose}
            targetElement={targetElement}
            callProductData={callProductData}
          />
        </>
      ) : (
        <div className="text-center mt-5">
          <p>No product available</p>
        </div>
      )}
    </>
  );
};
export default Listing;
