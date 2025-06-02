import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// 1st step
const ProductContext = createContext();

const API = `${import.meta.env.VITE_SERVER_URL}/api/products`;

// 2nd step
const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [load, setLoad] = useState(true);
  
  const [darkmode,setDarkmode]=useState(false);
  useEffect(()=>{
    const root=document.getElementById('root');
    if(darkmode){
      root.classList.add('dark-mode');
    }
    else{
      root.classList.remove('dark-mode');
    }
  },[darkmode])

  const [addtoCart, setAddtoCart] = useState(() => {
    const savedCart = localStorage.getItem("Localcart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const setDecrease = (product_id) => {
    const UpdateQuantity = addtoCart.map((item) =>
      item._id === product_id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    );
    setAddtoCart(UpdateQuantity);
  };
  const setIncrease = (stock, product_id) => {
    const UpdateQuantity = addtoCart.map((item) =>
      item._id === product_id
        ? {
            ...item,
            quantity: item.quantity < stock ? item.quantity + 1 : stock,
          }
        : item
    );
    setAddtoCart(UpdateQuantity);
  };

  const fectchingProducts = async (url) => {
    try {
      const response = await axios.get(url);
      console.log(response);
      setProduct([...response.data.data]||[]);
    } catch (error) {
      console.log("error fetch", error);
      toast.error('Products fetching error!!')
    } finally {
      setLoad(false);
    }
  };
  const handleAddtoCart = (eachProduct) => {
    const existing = addtoCart.find((item) => item._id === eachProduct._id);

    if (existing) {
      if (existing.quantity >= eachProduct.availability) {
        toast.error("Reached maximum stock limit!");
        return;
      }
      // increase quantity
      const updateCart = addtoCart.map((item) =>
        item._id === eachProduct._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setAddtoCart(updateCart);
      toast.success('Product quality updated!')
    } else {
      // add new item with quantity 1 or default 1
      setAddtoCart([...addtoCart, { ...eachProduct, quantity: 1 }||1]);
      toast.success("Product added Successfully!");
    }
    
  };

  useEffect(() => {
    localStorage.setItem("Localcart", JSON.stringify(addtoCart));
  }, [addtoCart]);

  useEffect(() => {
    const delayfecth = setTimeout(() => {
      fectchingProducts(API);
    }, 1000);

    return () => clearTimeout(delayfecth);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        product,
        load,
        darkmode,
        setDarkmode,
        setProduct,
        setIncrease,
        setDecrease,
        addtoCart,
        setAddtoCart,
        handleAddtoCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
