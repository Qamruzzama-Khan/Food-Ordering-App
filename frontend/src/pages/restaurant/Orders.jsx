import { useEffect, useState } from "react"
import { getOrdersByRestaurant } from "../../services/api/order"
import { useAuthContext } from "../../hooks/useAuth"
import { useParams } from "react-router-dom";
import OrderItem from "../../components/order/OrderItem";

const Orders = () => {
  const {user} = useAuthContext();
  const {restaurantId} = useParams();
  const [orders, setOrders] = useState();

  useEffect(() => {
    const getOrders = async () => {
      const response = await getOrdersByRestaurant(restaurantId, user?.accessToken);
      setOrders(response.data.data)
    }
    getOrders();
  }, [])

  return (
   <div>
  <h1 className="text-2xl font-semibold mb-4 text-gray-700">Orders</h1>
 <div className="overflow-x-auto w-full">
   <table className="min-w-[800px] w-full text-sm text-left border border-gray-200 bg-white shadow-md rounded overflow-hidden">
    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
      <tr>
        <th className="px-4 py-3">Sr.No</th>
        <th className="px-4 py-3">Order ID</th>
        <th className="px-4 py-3">Date</th>
        <th className="px-4 py-3">Total Items</th>
        <th className="px-4 py-3">Total Bill</th>
        <th className="px-4 py-3">Payment</th>
        <th className="px-4 py-3">Customer</th>
        <th className="px-4 py-3">Status</th>
      </tr>
    </thead>
    <tbody>
      {orders && orders.map((order, index) => (
      <OrderItem key={order._id} order={order} index={index} />
      ))}
    </tbody>
  </table>
 </div>
</div>
  )
}

export default Orders
