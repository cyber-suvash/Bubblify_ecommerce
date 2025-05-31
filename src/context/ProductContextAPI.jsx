import { createContext, useEffect, useState } from "react";
import axios from "axios";

// 1st step
const ProductContext = createContext();

const API = `${import.meta.env.VITE_SERVER_URL}/api/products`;

// 2nd step
const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [load, setLoad] = useState(true);

  const fectchingProducts = async (url) => {
    try {
      const response = await axios.get(url);
      console.log(response);
      setProduct([...response.data.data]);
    } catch (error) {
      console.log('error fetch',error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    const delayfecth = setTimeout(() => {
      fectchingProducts(API);
    }, 1000);

    return () => clearTimeout(delayfecth);
  }, []);

  return (
    <ProductContext.Provider value={{ product, load }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
