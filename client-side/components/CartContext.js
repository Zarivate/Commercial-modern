import { useState, createContext, useEffect } from "react";

export const CartContext = createContext({});

function CartContextProvider({ children }) {
  // Checks to see if the code is running on the client side, if so get access to the local storage else return null
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const [cartProducts, setCartProducts] = useState([]);

  // So that the number of items in a cart isn't lost on refresh, it's saved in local storage
  useEffect(() => {
    // So long as something exists in the cart, save it to the localStorage everytime cartProducts is changed
    if (cartProducts?.length > 0) {
      // Save the key value pair of "cart" alongside the data of whatever exists in the cartProducts state at the time
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  // Hook that retrieves any data existing within the established key value pair of cart saved in local storage
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  // Function that adds a product to the existing context using it's id
  function addProducts(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProducts }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
