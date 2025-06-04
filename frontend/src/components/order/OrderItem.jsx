import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../../hooks/useAuth";
import { inrFormat } from "../../utils/InrFormat"
import { updateOrderStatus } from "../../services/api/user";

const Item = ({order, index}) => {
     const {user, dispatch} = useAuthContext();

     const handleUpdateOrderStatus = async (e, orderId) => {
    const token = user?.accessToken;

    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // in seconds

      if (decoded.exp < currentTime) {
        // Token expired
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      } else {
        const { value } = e.target;
        const response = await updateOrderStatus(orderId, value, user?.accessToken);
        console.log(response.data.data)
      }
    }
  };

  return (
    <tr className="border-t">
          <td className="px-4 py-3">{index + 1}</td>
          <td className="px-4 py-3 text-xs text-gray-700">{order._id}</td>
          <td className="px-4 py-3">
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </td>
          <td className="px-4 py-3 text-center">{order.totalItems}</td>
          <td className="px-4 py-3 font-medium text-green-600">
            {inrFormat(order.totalBill)}
          </td>
          <td className="px-4 py-3 capitalize">{order.paymentMethod}</td>
          <td className="px-4 py-3">{order.shippingInfo?.name}</td>
            <td className="px-4 py-3">
             <select
                    onChange={(e) => handleUpdateOrderStatus(e, order._id)}
                   className={`rounded cursor-pointer px-3 py-1 border border-gray-600 font-medium ${
                order.status === "Pending"
                  ? "text-yellow-700"
                  : order.status === "Delivered"
                  ? "text-green-700"
                  : "text-gray-600"
              }`}
                  >
                    <option value={order.status}>{order.status}</option>

                    <option 
                      value={order.status === "Shipped" ? "Pending" : "Shipped"}
                    >
                      {order.status === "Shipped" ? "Pending" : "Shipped"}
                    </option>
                  </select>
          </td>
        </tr>
  )
}

export default Item
