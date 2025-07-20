import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// 1st step
const ProductContext = createContext();

const API = import.meta.env.VITE_SERVER_URL;

// 2nd step
const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [review, setReview] = useState({
    comment: "",
    rating: 1,
  });
  const [loader, setLoader] = useState(true);
  const [darkmode, setDarkmode] = useState(false);

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

  const fectchingProducts = async () => {
    // try {
    //   const response = await axios.get(url);
    //   if (response.data) {
    //     setProduct([...response.data.products]);
    //   }
    //   setProduct([]);
    // } catch (error) {
    //   console.log("error fetch", error);
    //   toast.error(error.response.data.msg);
    // } finally {
    //   setLoader(false);
    // }
    setLoader(true);
    try {
      const res = await axios.get(`${API}/api/products`);
      if (res.data) {
        setProduct(res.data.products || []);
      }
    } catch (error) {
      toast.error("Failed to fetch");
    }
    setLoader(false);
  };
  // single product fetch
  const OneProductFetch = async (id) => {
    setLoader(true);
    try {
      const res = await axios.get(`${API}/api/products/${id}`);
      if (res.data) {
        setOneProduct(res.data.product);
      } else {
        toast.error("try sometimes later");
      }
    } catch (error) {
      toast.error("single product fetching error");
    }
    setLoader(false);
  };

  // add to cart

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
      toast.success("Product quality updated!");
    } else {
      // add new item with quantity 1 or default 1
      setAddtoCart([...addtoCart, { ...eachProduct, quantity: 1 } || 1]);
      toast.success("Product added Successfully!");
    }
  };

  // add review
  const reviewSubmit = async (id) => {
    const toastID = toast.loading("submitting...");
    try {
      const response = await axios.post(`${API}/${id}/review`, review);
      console.log(response);
      toast.success("Review submitted!", { id: toastID });
      setReview({ comment: "", rating: 1 });
      OneProductFetch(id);
    } catch (error) {
      console.log("failed to submit", error);
      toast.error("failed to submit review");
    }
  };
  useEffect(() => {
    const root = document.getElementById("root");
    if (darkmode) {
      root.classList.add("dark-mode");
    } else {
      root.classList.remove("dark-mode");
    }
  }, [darkmode]);

  useEffect(() => {
    localStorage.setItem("Localcart", JSON.stringify(addtoCart));
  }, [addtoCart]);

  useEffect(() => {
    const delayfecth = setTimeout(() => {
      fectchingProducts();
    }, 1000);

    return () => clearTimeout(delayfecth);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        product,
        loader,
        darkmode,
        addtoCart,
        oneProduct,
        review,
        setReview,
        setDarkmode,
        setProduct,
        setIncrease,
        setDecrease,
        OneProductFetch,
        setAddtoCart,
        handleAddtoCart,
        reviewSubmit,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
