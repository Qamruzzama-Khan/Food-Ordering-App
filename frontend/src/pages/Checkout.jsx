import Form from "../components/order/Form";
import Summary from "../components/order/Summary";
import { useCartContext } from "../hooks/useCart";

const Checkout = () => {
  const {cart} = useCartContext();

  return (
     <div className="px-4 py-6 md:px-8 mt-6">
  {cart === null || cart.items === undefined ? (
    <p className="text-center text-lg text-gray-500 animate-pulse">Loading...</p>
  ) : cart.items.length === 0 ? (
    <div className="text-center py-10 text-gray-500">
      <p className="text-xl font-medium">Your cart is empty</p>
      <p className="mt-2 text-sm">Start adding items to see them here.</p>
    </div>
  ) : (
    <div className="flex flex-col-reverse md:flex-row gap-6  items-start lg:w-[70%] mx-auto">
      {/* Order Form */}
      <div className="w-full md:w-[65%] bg-white rounded p-4 md:p-6 border border-gray-300">
        <Form />
      </div>

      {/* Order Summary */}
      <div className="w-full md:w-1/3 bg-gray-50 rounded p-2 border border-gray-300">
        <h2 className="text-lg font-semibold  text-gray-800">Order Summary</h2>
        <Summary />
      </div>
    </div>
  )}
</div>

  );
};

export default Checkout;
