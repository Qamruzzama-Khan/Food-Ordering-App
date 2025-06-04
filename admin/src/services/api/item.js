import axios from "axios";
import { common_Url } from "../../utils/constants";

const api = axios.create({
  baseURL: `${common_Url}/item`,
});

// Get Items
export const getItems = () => api.get("/get-items");

// Get Item
export const getItem = (itemId) => api.get(`/get-item/${itemId}`);

// create product
export const addItem = (token, data) =>
  api.post("/create-item", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// delete product
export const deleteItem = (token, itemId) =>
  api.delete(`/delete-item/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// update product
export const updateItem = (token, data, itemId) =>
  api.put(`/update-item/${itemId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
