import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addItem, deleteItem, updateItem } from "../controllers/item.controller.js";
import { updateOrderStatus } from "../controllers/order.controller.js";
import { deleteRestaurant, getRestaurantByUser, updateRestaurant } from "../controllers/restaurant.controller.js";

const router = Router();

// Get Restaurant By User
router.route("/get-restaurant").get(verifyJWT, getRestaurantByUser)

// Update Restaurant
router.route("/update-restaurant/:restaurantId").put(verifyJWT, upload.single("coverImage"), updateRestaurant);

// Delete Restaurant
router.route("/delete-restaurant/:restaurantId").delete(verifyJWT, deleteRestaurant);

// Add Item only if current user have an restauarant with same account
router.route("/add-item").post(verifyJWT, upload.single("image"), addItem);

// Update Item 
router.route("/update-item/:itemId").put(verifyJWT, upload.single("image"), updateItem);

// Delete Item
router.route("/delete-item/:itemId").delete(verifyJWT, deleteItem);

// Update Order Status
router.route("/update-order-status/:orderId").post(verifyJWT, updateOrderStatus);

export default router;
