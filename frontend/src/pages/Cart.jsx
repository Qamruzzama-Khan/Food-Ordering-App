import { useEffect } from "react";
import { getCart } from "../services/api/cart";
import { useAuthContext } from "../hooks/useAuth";
import CartItem from "../components/CartItem";
import { useCartContext } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { inrFormat } from "../utils/InrFormat";

const Cart = () => {
  const {cart, setCart} = useCartContext();
   const {user} = useAuthContext();
   const navigate = useNavigate();

    // Get And Set Cart
    useEffect(() => {
        const getMyCart = async () => {
            const response = await getCart(user?.accessToken);
            setCart(response.data.data)
        };
        if(user?.accessToken){
            getMyCart();
        }
    }, [user])

  return (
  <div className="p-4 md:p-6 mt-6">
  {cart === null || cart.items === undefined || cart.items.length === 0 ? (
    <p className="text-center text-lg text-gray-500">No items added to cart.</p>
  ) :(
    <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto rounded-lg p-4 md:p-6 bg-white">
      
      {/* Cart Items Section */}
      <div className="flex-1 space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Your Cart</h2>
        {cart.items.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>

      {/* Summary Section */}
      <div className="w-full md:w-[37%] bg-gray-50 border border-gray-200 rounded-lg p-6 ">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Total Items:</span>{" "}
          {cart.items.length}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-medium">Total Bill: </span>{inrFormat(cart.totalBill)}
        </p>
        <button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )}
</div>
  );
};

export default Cart;
