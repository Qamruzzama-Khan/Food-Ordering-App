import { useEffect, useState } from "react";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeFromCart,
} from "../services/api/cart";
import { useAuthContext } from "../hooks/useAuth";
import { useCartContext } from "../hooks/useCart";
import { IoMdClose } from "react-icons/io";
import { inrFormat } from "../utils/InrFormat";

const CartItem = ({ item }) => {
  const { user } = useAuthContext();
  const { cart, setCart } = useCartContext();

  const handleIncreaseItemQuantity = async () => {
    if (user) {
      try {
        // Update cart context
        setCart({
          ...cart,
          items: [
            ...cart.items.map((cartItem) =>
              cartItem._id === item._id
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                    subTotal: cartItem.subTotal + cartItem.price,
                  }
                : cartItem
            ),
          ],
          totalBill: cart.totalBill + item.price,
        });
        // Backend request
       await increaseItemQuantity(
          user?.accessToken,
          item._id
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/auth");
    }
  };

  const handleDecreaseItemQuantity = async () => {
    if (user) {
      try {
        // Update cart context
        setCart({
          ...cart,
          items: [
            ...cart.items.map((cartItem) =>
              cartItem._id === item._id
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity - 1,
                    subTotal: cartItem.subTotal - cartItem.price,
                  }
                : cartItem
            ),
          ],
          totalBill: cart.totalBill - item.price,
        });
        // Backend request
       await decreaseItemQuantity(
          user?.accessToken,
          item._id
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/auth");
    }
  };

  const handleRmoveItem = async () => {
     if (user) {
      try {
        // Update cart context
        setCart({
          ...cart,
          items: cart.items.filter((cartItem) => cartItem._id !== item._id),
          totalBill: cart.totalBill - item.subTotal,
        });
        // Backend request
        await removeFromCart(
          user?.accessToken,
          item._id
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/auth");
    }
  }

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-300 gap-4">
      {/* Item Name & Price */}
      <div className="flex-1">
        <p className="text-lg font-medium text-gray-800">{item.item.name}</p>
        <p className="text-sm text-gray-500 ">Price: {inrFormat(item.price)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center bg-gray-100 rounded overflow-hidden">
        <button
          className="px-3 py-1 bg-gray-200  hover:bg-gray-300 cursor-pointer"
          onClick={handleDecreaseItemQuantity}
        >
          −
        </button>
        <span className="px-4">{item.quantity}</span>
        <button
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 cursor-pointer"
          onClick={handleIncreaseItemQuantity}
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right">
        <p className="text-gray-700 font-semibold">Subtotal</p>
        <p className="text-orange-600 font-bold">{inrFormat(item.subTotal)}</p>
      </div>
      {/* Remove-btn */}
      <button type="button" onClick={handleRmoveItem} className="cursor-pointer">
        <IoMdClose className="text-lg text-gray-700 font-semibold hover:text-red-500" />
      </button>
    </div>
  );
};

export default CartItem;
