import axios from "axios";
import { common_Url } from "../../utils/constants";

const api = axios.create({
  baseURL: `${common_Url}/item`,
});

// Get Items
export const getItems = () => api.get("/get-items");

// Get Items by restaurant
export const getItemsByRestaurant = (restauarantId) => api.get(`/get-items-byRestaurant/${restauarantId}`);

// Get One Item
export const getItem = (itemId) => api.get(`/get-item/${itemId}`);
