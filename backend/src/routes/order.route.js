import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  createOrderFromCart,
  getOrdersByUser,
  getOneOrder,
  getOrdersByRestaurant,
} from "../controllers/order.controller.js";

const router = Router();

// create order from cart
router.route("/create-order/:cartId").post(verifyJWT, createOrderFromCart);

// get placed orders by user
router.route("/get-placed-orders").get(verifyJWT, getOrdersByUser);

// get one order
router.route("/get-one-order/:orderId").get(verifyJWT, getOneOrder);

// get orders by restaurant
router.route("/get-orders-byRestaurant/:restaurantId").get(verifyJWT, getOrdersByRestaurant);



export default router;
