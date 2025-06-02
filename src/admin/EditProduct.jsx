import React, { useEffect, useContext, useState } from "react";
import { AdminProductContext } from "../context/AdminContex";

const EditProduct = ({ show, handleClose, targetProduct }) => {
  const { updateProduct, products ,CategoryList} = useContext(AdminProductContext);

  const [editData, setEditdata] = useState({
    product_name: "",
    category: "",
    price: "",
    description: "",
    availability: "",
    image: "",
    rating: null,
  });

  useEffect(() => {
    if (targetProduct) {
      setEditdata(targetProduct);
    }
  }, [targetProduct]);

  useEffect(()=>{
    console.log('editdata: ',editData);
  },[editData])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditdata((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(editData._id, editData);
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
                  <img src={editData.image} alt={editData.name} height={150} />
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
                      Image Link
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="image"
                      value={editData.image}
                      onChange={handleChange}
                      placeholder="paste image link here"
                      name="image"
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
