import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CreateProduct = ({ BootModal, setBootModal }) => {
  const CategoryList = [
    "Electronics",
    "Fashion",
    "Beauty",
    "Footware",
    "others",
  ];

  const [product_data, setProduct_data] = useState({
    product_name: "",
    category: "",
    price: "",
    description: "",
    availability: "",
    image: "",
    rating: null,
  });

  const handleProductValue = (e) => {
    const { name, value } = e.target;
    setProduct_data((prev) => ({
      ...prev,
      [name]: name === "price" ? parseInt(value) : value,
    }));
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!product_data.product_name) {
      return alert("please fill name");
    }
    if (!product_data.price) {
      alert("please enter price");
    }
    console.log(product_data);
    try {
      const responce = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/create`,
        product_data
      );
      if (responce.status === 201) {
        toast.success("Product Created Successfully!");
      }
      console.log(responce);
      setProduct_data({
        product_name: "",
        category: "",
        price: "",
        description: "",
        availability: "",
        image: "",
        rating: null,
      });
    } catch (error) {
      console.log(error);
      toast.error("Internal server error!");
    }
  };

  return (
    <>
      {BootModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content ">
              <div className="modal-header">
                <h5 className="modal-title">Create Product</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setBootModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <form className="row g-3" onSubmit={handleCreateProduct}>
                  <div className="col-md-6">
                    <label htmlFor="product_name" className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="product_name"
                      value={product_data.product_name}
                      name="product_name"
                      onChange={handleProductValue}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">
                      Category
                    </label>
                    <select
                      id="inputState"
                      className="form-select"
                      value={product_data.category}
                      onChange={handleProductValue}
                      name="category"
                      required
                    >
                      <option value="">Choose...</option>
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
                      value={product_data.price}
                      onChange={handleProductValue}
                      placeholder="Enter price"
                      name="price"
                      required
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
                      value={product_data.availability}
                      onChange={handleProductValue}
                      placeholder="enter number of quantity"
                      name="availability"
                      required
                    />
                  </div>

                  <div className="mb-0">
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
                      value={product_data.description}
                      onChange={handleProductValue}
                      name="description"
                      required
                      placeholder="product describe here"
                    ></textarea>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="" className="form-label">
                      Image Link
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="image"
                      value={product_data.image}
                      onChange={handleProductValue}
                      placeholder="paste image link here"
                      name="image"
                    />
                  </div>
                  <div className="col-12 ">
                    <button type="submit" className="btn btn-primary">
                      Create Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProduct;
