import axios from "axios";
import { common_Url } from "../../utils/constants";

const api = axios.create({
  baseURL: `${common_Url}/restaurant`,
});

// create restaurant
export const createRestaurant = (token, data) =>
  api.post("/create-restaurant", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// get all approved restaurants
export const getAllRestaurants = () => api.get("/get-approved-restaurants");

// Get one restaurant
export const getRestaurant = (restaurantId) => api.get(`/get-restaurant/${restaurantId}`);

// Search approved restaurants by city or restaurant name
export const searchRestaurantsByCityOrRestaurantName = (searchQuery) => api.get(`/search?query=${searchQuery}`);

