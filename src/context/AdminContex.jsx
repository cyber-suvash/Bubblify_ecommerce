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
  const fetchfromAdmin = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/products`
      );
      if (res.data) {
        setProducts(res.data.products || []);
      }
    } catch (error) {
      toast.error("Failed to fetch");
    }
    setLoader(false);
  };
  //   create product
  const createProduct=async(newproduct)=>{
    const toastID=toast.loading('Creating product..') 
    try {
        const res= await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/products/create`,newproduct);
        if(res.status===201){
            toast.success('Product created.',{id:toastID})
            fetchfromAdmin();
        }
    } catch (error) {
        toast.error('Create failed!',{id:toastID})
    }
  }

  // update product
  
  const updateProduct = async (id, updatedList) => {
    const toastID = toast.loading("Updating product...");
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/products/${id}`,
        updatedList
      );
      if (res.status === 200) {
        toast.success("Product Updated!", { id: toastID });
        fetchfromAdmin();
      }
    } catch (error) {
      toast.error("Update failed", { id: toastID });
    }
  };

  const deleteProduct = async (id) => {
    const toastID = toast.loading("Deleting product..");
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/products/${id}`
      );
      if (res.status === 200) {
        toast.success("product deleted", { id: toastID });
        setProducts((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error("Delete failed!",{id:toastID});
    }
  };

  useEffect(() => {
    fetchfromAdmin();
  }, []);

  return (
    <AdminProductContext.Provider
      value={{ products, loader, fetchfromAdmin,createProduct,deleteProduct, updateProduct,CategoryList }}
    >
      {children}
    </AdminProductContext.Provider>
  );
};
