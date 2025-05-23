import React, { useEffect, useState } from 'react';

const Listing = () => {
  const [product, setProduct] = useState([]);

  const showProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const datapr = await response.json();
      console.log(datapr.products);
      setProduct(datapr.products); // ✅ Correct assignment
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    showProducts();
  }, []);

  return (
    <div>
      {product.map((each, idx) => (
        <ul key={idx}>
          <li>ID: {each.id}</li>
          <li>Price: ${each.price}</li>
          <li>Category: {each.category}</li>
        </ul>
      ))}
    </div>
  );
};

export default Listing;
