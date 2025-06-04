import axios from "axios"
import { common_Url } from "../../utils/constants"

const api = axios.create({
    baseURL: `${common_Url}/order`
});

// create order
export const createOrder = (cartId, data, token) =>
  api.post(`/create-order/${cartId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// get placed orders
export const getPlacedOrders = (token) =>
  api.get("/get-placed-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// get one order
export const getOneOrder = (orderId, token) =>
  api.get(`/get-one-order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// get orders by restaurant
export const getOrdersByRestaurant = (restaurantId, token) =>
  api.get(`/get-orders-byRestaurant/${restaurantId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

