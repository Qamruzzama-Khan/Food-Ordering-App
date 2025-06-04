import axios from "axios";
import { common_Url } from "../../utils/constants";

const api = axios.create({
  baseURL: `${common_Url}/cart`,
});

// Add to cart
export const addToCart = (token, itemId) =>
  api.post(
    `/add-to-cart/${itemId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// Get cart
export const getCart = (token) =>
  api.get("/get-cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Increase item quantity
export const increaseItemQuantity = (token, itemId) =>
  api.post(
    `/increase-item-quantity/${itemId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// Increase item quantity
export const decreaseItemQuantity = (token, itemId) =>
  api.post(
    `/decrease-item-quantity/${itemId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// Remove item from cart
export const removeFromCart = (token, itemId) =>
  api.post(
    `/remove-from-cart/${itemId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
