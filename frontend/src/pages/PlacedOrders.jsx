import { useEffect } from "react"
import { getPlacedOrders } from "../services/api/order"
import { useAuthContext } from "../hooks/useAuth"
import { useState } from "react";
import PlacedOrderItem from "../components/order/PlacedOrderItem";

const PlacedOrders = () => {
    const {user} = useAuthContext();
    const [orders, setOrders] = useState();

    useEffect(() => {
        const getMyPlacedOrders = async () => {
            const response = await getPlacedOrders(user?.accessToken);
            console.log(response.data.data)
            setOrders(response.data.data)
        }
         if(user?.accessToken){
                 getMyPlacedOrders();
            }
    }, [user])
    
  return (
    <div className="p-2 md:p-5 flex flex-col md:flex-row gap-4 flex-wrap">
      {orders && orders.length > 0 ? orders.map((order) => (
        <PlacedOrderItem key={order._id} order={order} />
      )) : <div>No placed orders.</div>}
    </div>
  )
}

export default PlacedOrders
