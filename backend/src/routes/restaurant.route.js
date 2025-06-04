import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createRestaurant, getApprovedRestaurants, getRestaurant, searchRestaurantsByCityOrRestaurantName } from "../controllers/restaurant.controller.js";

const router = Router();

// Create Restaurant
router.route("/create-restaurant").post(verifyJWT, upload.single("coverImage"), createRestaurant);

// Get Restaurant
router.route("/get-restaurant/:restaurantId").get(getRestaurant);

// Get Approved Restaurants
router.route("/get-approved-restaurants").get(getApprovedRestaurants);

// Search Restaurants By City or RestaurantName
router.route("/search").get(searchRestaurantsByCityOrRestaurantName);

export default router;
