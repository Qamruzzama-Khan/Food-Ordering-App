import axios from "axios";
import { common_Url } from "../../utils/constants";

const api = axios.create({
  baseURL: `${common_Url}/admin`,
});

// Get All restaurants
export const getRestaurants = (token) =>
  api.get("/get-restaurants", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Restaurant Approval
export const restaurantApproval = (restaurantId, token) =>
  api.post(`/restaurant-approval/${restaurantId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
