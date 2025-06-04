import { useState } from "react";
import { getOneOrder } from "../../services/api/order";
import { useAuthContext } from "../../hooks/useAuth";
import { inrFormat } from "../../utils/InrFormat";

const PlacedOrderItem = ({ order }) => {
    const {user} = useAuthContext();
    const [isTracking, setIsTracking] = useState(false);
    const [orderStatus, setOrderStatus] = useState(order.status)

    const handleCheckOrderStatus = async (orderId) => {
    setIsTracking(true);
    const response = await getOneOrder(orderId, user?.accessToken);
    setTimeout(() => {
      setOrderStatus(response.data.data.status);
      setIsTracking(false);
    }, 1000);
  };

  return (
    <div className="border border-gray-300 md:w-[313px] rounded p-4 bg-white">
  {/* Date */}
  <p className="text-sm text-gray-500">
    {new Date(order.createdAt).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}
  </p>

  {/* Order Details */}
  <div className="mt-2 space-y-1 text-gray-700 text-sm md:text-base">
    <p>
      <span className="font-medium">Order ID:</span> {order._id}
    </p>
    <p>
      <span className="font-medium">Total Items:</span> {order.totalItems}
    </p>
    <p>
      <span className="font-medium">Total Bill: </span>{inrFormat(order.totalBill)}
    </p>
  </div>

  {/* Status and Track Button */}
  <div className="flex items-center text-sm mt-3">
      <span className="px-3 py-1 rounded-l bg-orange-100 text-orange-700 font-medium">
        {isTracking ? "Tracking..." : orderStatus}
      </span>
      <button
        onClick={() => handleCheckOrderStatus(order._id)}
        className="bg-orange-500 text-white px-3 py-1 rounded-r text-sm hover:bg-orange-600 transition cursor-pointer"
      >
        Track
      </button>
    </div>
</div>
  );
};

export default PlacedOrderItem;
