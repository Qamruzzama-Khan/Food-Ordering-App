import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { getRestaurants, restaurantApproval } from "../controllers/restaurant.controller.js";
import { updateOrderStatus } from "../controllers/order.controller.js";

const router = Router();

// Get All Restaurants
router.route("/get-restaurants").get(verifyJWT, verifyAdmin, getRestaurants);

// Restaurant Approval
router
  .route("/restaurant-approval/:restaurantId")
  .post(verifyJWT, verifyAdmin, restaurantApproval);

// Update order status
router
  .route("/update-order-status/:orderId")
  .post(verifyJWT, verifyAdmin, updateOrderStatus);

export default router;
