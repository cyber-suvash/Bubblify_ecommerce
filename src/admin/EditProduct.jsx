import React, { useEffect, useContext, useState } from "react";
import { AdminProductContext } from "../context/AdminContex";
import toast from "react-hot-toast";


const EditProduct = ({ show, handleClose, targetProduct }) => {
  const { updateProduct, products, CategoryList } =
    useContext(AdminProductContext);
  const [pic, setpic] = useState(null);

  const [editData, setEditdata] = useState({
    product_name: "",
    category: "",
    price: "",
    description: "",
    availability: "",
    image: {},
  });

  useEffect(() => {
    if (targetProduct) {
      setEditdata(targetProduct);
    }
  }, [targetProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditdata((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formpic = new FormData();
    if (!pic) {
      toast.error("choose an image");
    }
    formpic.append("product_image", pic);

    await updateProduct(editData._id, formpic, editData);
    handleClose();
  };

  return (
    <div className="container mt-4">
      {/* Modal */}
      {show && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header ">
                <h5 className="modal-title">Edit Product</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <div className="text-center">
                  <img
                    src={editData.image.url}
                    alt={editData.name}
                    height={200}
                    className=""
                  />
                </div>
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <label htmlFor="product_name" className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="product_name"
                      name="product_name"
                      value={editData.product_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">
                      Category
                    </label>
                    <select
                      id="inputState"
                      className="form-select"
                      name="category"
                      value={editData.category}
                      onChange={handleChange}
                    >
                      {CategoryList.map((each, idx) => (
                        <option value={each} key={idx}>
                          {each}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      value={editData.price}
                      onChange={handleChange}
                      placeholder="xxxxxxxx"
                      name="price"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="form-label">
                      Available Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="availability"
                      value={editData.availability}
                      onChange={handleChange}
                      placeholder="enter number of quantity"
                      name="availability"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="" className="form-label">
                      Chnage Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="product_image"
                      onChange={(e) => setpic(e.target.files[0])}
                      name="product_image"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="2"
                      name="description"
                      value={editData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
