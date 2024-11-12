import { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import PageHeader from "../components/PageHeader";

import Seo from "../components/Seo";

const Cart = () => {
  const { cart, updateCart, removeFromCart } = useContext(CartContext);

  const handleIncrement = (item) => {
    updateCart(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateCart(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + (item.prices.price * item.quantity) / 100,
        0
      ),
    [cart]
  );

  return (
    <>
      <Seo
        title="Cart - The Waterboy"
        description="Browse this amazing Cart"
        url={window.location.href}
      />

      <PageHeader title="Cart" image_url="/header-bg-img/cart.webp" />
      <div className="cart">
        {cart.length === 0 ? (
          <p>Your Cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <h2>{item.name}</h2>

                {/* Display the product image */}
                {item.images && item.images.length > 0 && (
                  <img
                    src={item.images[0].src}
                    alt={item.images[0].alt || item.name}
                    className="cart-item-image"
                  />
                )}

                <p>Price: ${parseFloat(item.prices.price / 100).toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <div className="cart-buttons">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <button onClick={() => handleIncrement(item)}>+</button>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove Item
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </>
  );
};

export default Cart;
