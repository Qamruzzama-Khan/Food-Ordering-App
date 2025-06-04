import { useCartContext } from "../../hooks/useCart";
import { inrFormat } from "../../utils/InrFormat";

const OrderSummary = () => {
  const { cart } = useCartContext();

  return (
 <div className="w-full p-4 border border-gray-300 rounded mt-2 bg-white">
  {cart && cart.items && cart.items.length > 0 ? (
    <div className="space-y-3">
      {cart.items.map((item) => (
        <div
          key={item._id}
          className="flex items-center justify-between"
        >
          <div className="flex flex-col  text-gray-700 text-sm">
            <span className="font-semibold">{item.item.name}</span>
          <span className="text-gray-500">Price: {inrFormat(item.price)}</span>
          </div>
            <p className="text-center text-sm text-gray-600">qty: {item.quantity}</p>
        </div>
      ))}

      <div className="pt-2 border-t border-gray-400 text-gray-700">
        <div className="flex justify-between mb-1 text-sm">
          <span className="font-medium">Total Items</span>
          <span>{cart.items.length}</span>
        </div>
        <div className="flex justify-between font-semibold text-orange-600">
          <span>Total Bill</span>
          <span>{inrFormat(cart.totalBill)}</span>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-gray-500 text-sm">No items in cart.</p>
  )}
</div>
  );
};

export default OrderSummary;
