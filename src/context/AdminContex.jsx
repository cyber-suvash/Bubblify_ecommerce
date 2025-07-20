import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AdminProductContext = createContext();
export const AdminProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const CategoryList = [
    "Electronics",
    "Fashion",
    "Beauty",
    "Footware",
    "others",
  ];

  const URL=import.meta.env.VITE_SERVER_URL;
  // const URL = "http://localhost:3000";

  const fetchfromAdmin = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/products`);
      if (res.data) {
        setProducts(res.data.products || []);
      }
    } catch (error) {
      toast.error("Failed to fetch");
    }
    setLoader(false);
  };
  
  //   create product
  const createProduct = async (image, newproduct) => 
   {
     setLoader(true);
    const toastID = toast.loading("Creating product..");
    try {
      const imageRes = await axios.post(
        `${URL}/api/images/products/upload`,image);
      if (imageRes.status === 200 && imageRes.data) {
        const { url, filename } = imageRes.data;
        const updated = { ...newproduct, image: { url, filename } };
        console.log(updated);
        const res = await axios.post(`${URL}/api/products/create`, updated);
        console.log(res);
        if (res.status === 201) {
          toast.success("Product created.", { id: toastID });
          fetchfromAdmin();
        }
      }
    }  
     catch (error) {
      console.log(error);
      toast.error("Create failed!", { id: toastID });
    }
    setLoader(false);
  };

  // update product

  const updateProduct = async (id, imageFile, editData) => {
    const toastID = toast.loading("Updating product...");
    try {
      const imageRes = await axios.post(
        `${URL}/api/images/products/upload`,
        imageFile
      );
      if (imageRes.status === 200 && imageRes.data) {
        const { url, filename } = imageRes.data;
        const updatedList = { ...editData, image: { url, filename } };
        const res = await axios.put(`${URL}/api/products/${updatedList._id}`, updatedList);
        if (res.status === 200) {
          toast.success("Product Updated!", { id: toastID });
          fetchfromAdmin();
        }
      }
    } catch (error) {
      toast.error("Update failed", { id: toastID });
    }
  };

  const deleteProduct = async (id) => {
    const toastID = toast.loading("Deleting product..");
    try {
      const res = await axios.delete(`${URL}/api/products/${id}`);
      if (res.status === 200) {
        toast.success("product deleted", { id: toastID });
        setProducts((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error("Delete failed!", { id: toastID });
    }
  };

  useEffect(() => {
    fetchfromAdmin();
  }, []);

  return (
    <AdminProductContext.Provider
      value={{
        products,
        loader,
        fetchfromAdmin,
        createProduct,
        deleteProduct,
        updateProduct,
        CategoryList,
      }}
    >
      {children}
    </AdminProductContext.Provider>
  );
};
