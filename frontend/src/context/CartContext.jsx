import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuth";
import { getCart } from "../services/api/cart";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const { user } = useAuthContext();

  // Get And Set Cart
  useEffect(() => {
    const getMyCart = async () => {
      const response = await getCart(user?.accessToken);
      setCart(response.data.data);
    };
    if (user?.accessToken) {
      getMyCart();
    }
  }, [user]);

//   useEffect(() => {
//     console.log("Cart State: ", cart);
//   }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
