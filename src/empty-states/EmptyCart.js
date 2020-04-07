import React from "react";
import emptyCart from '../images/emptycart.JPG'
const EmptyCart = props => {
  return (
    <div className="empty-cart">
      <img
        src={emptyCart}
        alt="empty-cart"
      />
      <h2>Your cart is empty.</h2>
    </div>
  );
};

export default EmptyCart;
