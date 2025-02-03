import React, { useState } from "react";
import Header from "../components/Header";
import HomeBanner from "../components/HomeBanner";
import ProductsPage from "./ProductPage";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Data from "../components/Data";

export const Home = () => {
  const [item, setItem] = useState(Data);

  const filteredData = (category) => {
    const newItems = Data.filter((each) => each.category === category);
    setItem(newItems);
  };

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const handleSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  return (
    <>
      <Header isOpenSidebar={isOpenSidebar} handleSidebar={handleSidebar} />
      <HomeBanner />
      <ProductsPage data={item} filteredData={filteredData} setItem={setItem} />
      <Newsletter />
      <Footer />
    </>
  );
};
  