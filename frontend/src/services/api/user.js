import axios from "axios";
import { common_Url } from "../../utils/constants";

const api = axios.create({
  baseURL: `${common_Url}/user`,
});

// Get Restaurant By User
export const getRestaurantByUser = (token) =>
  api.get("/get-restaurant", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Add Item
export const addItem = (data, token) =>
  api.post("/add-item", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Update Item
export const updateItem = (data, token, itemId) =>
  api.put(`/update-item/${itemId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Delete Item
export const deleteItem = (itemId, token) =>
  api.delete(`/delete-item/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // update order status
export const updateOrderStatus = (orderId, status, token) =>
  api.post(
    `/update-order-status/${orderId}`,
     { status: status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // update restaurant
  export const updateRestaurant = (token, data, restaurantId) =>
    api.put(`/update-restaurant/${restaurantId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  // delete restaurant
  export const deleteRestaurant = (token, restaurantId) =>
    api.delete(`/delete-restaurant/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
