import {Router} from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addToCart, decreaseItemQuantity, deleteCart, getCart, increaseItemQuantity, removeFromCart } from "../controllers/cart.controller.js";

const router = Router();

// Add to cart
router.route("/add-to-cart/:itemId").post(verifyJWT, addToCart);

// Remove from cart
router.route("/remove-from-cart/:itemId").post(verifyJWT, removeFromCart);

// Delete Cart
router.route("/delete-cart/:cartId").delete(verifyJWT, deleteCart);

// Get cart
router.route("/get-cart").get(verifyJWT, getCart);

// Increase item quantity
router.route("/increase-item-quantity/:itemId").post(verifyJWT, increaseItemQuantity);

// Decrease item quantity
router.route("/decrease-item-quantity/:itemId").post(verifyJWT, decreaseItemQuantity);

export default router;

