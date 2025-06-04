import express, { Router } from "express";
import { getItems, getItem, searchItemsByName, getItemsByRestaurant } from "../controllers/item.controller.js";

const router = Router();

// Get All Items
router.route("/get-items").get(getItems);

// Get One Item
router.route("/get-item/:itemId").get(getItem);

// Get Items by restaurant
router.route("/get-items-byRestaurant/:restaurantId").get(getItemsByRestaurant);

// Search Items By Name
router.route("/search").get(searchItemsByName);

export default router;
