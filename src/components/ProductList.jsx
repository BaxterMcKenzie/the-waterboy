import React, { useEffect, useState, useContext } from "react";
import wooCommerceApi from "../woocommerceApi";
import { CartContext } from "../context/CartContext";
import PageHeader from "./PageHeader";

import Seo from "./Seo";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext); // Access addToCart from CartContext

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await wooCommerceApi.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // Add product to cart
  };

  return (
    <>
       <Seo
        title="Shop - The Waterboy"
        description="Browse this amazing shop"
        url={window.location.href}
      />

      <PageHeader title="Products" image_url="/header-bg-img/shop.webp" />
      <div className="products">
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>

              {/* Display the product image */}
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt || product.name}
                  style={{ width: "200px", height: "200px" }}
                />
              )}

              {/* Display the product price */}
              <p>Price: ${(product.prices.price / 100).toFixed(2)}</p>

              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductList;
