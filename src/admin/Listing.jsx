import React, { useEffect, useState, useContext } from "react";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import FormatPrice from "../helpers/FormatPrice";
import { AdminProductContext } from "../context/AdminContex";
import EditProduct from "./EditProduct";

const Listing = () => {
  const { products, loader, deleteProduct } = useContext(AdminProductContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [targetProduct, setTargetProduct] = useState();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleDelete = (id) => {
    if (window.confirm("Are you serious?")) {
      deleteProduct(id);
    }
  };

  const handleIdSet = (id) => {
    const eachProduct = products.find((item) => item._id === id);
    if (eachProduct) {
      setTargetProduct({ ...eachProduct });
      setShow(true);
    }
  };

  return (
    <>
      {loader ? (
        <div className="text-center mt-5">
          <CircularProgress />
          <p>Loading products...</p>
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="row p-3">
            <div className="col rounded bg-primary text-white py-3">
              <h4>Product List</h4>
              <div className="table-responsive rounded">
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
                    {products.map((each, idx) => (
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
                        <td>
                          <FormatPrice price={each.price} />
                        </td>
                        <td>{each.availability}</td>
                        <td>
                          <Rating name="read-only" value={3} readOnly />
                        </td>
                        <td>
                          <IconButton onClick={()=>handleDelete(each._id)}>
                            <DeleteForeverIcon sx={{ color: "crimson" }} />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() => handleIdSet(each._id)}
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
            targetProduct={targetProduct}
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
