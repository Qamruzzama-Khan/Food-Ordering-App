import { Item } from "../models/item.model.js";
import { Cart } from "../models/cart.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

// Add to cart
const addToCart = AsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;

  let quantity = 1;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid item ID");
  }

  const item = await Item.findById(itemId);
  if (!item) throw new ApiError(404, "Item not found");

  const subTotal = quantity * item.price;

  // Find user's cart
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    // Create a new cart if not exists
    cart = new Cart({
      userId,
      items: [
        {
          item: itemId,
          quantity,
          price: item.price,
          subTotal,
        },
      ],
      restaurant: item.restaurant,
      totalBill: subTotal,
    });
  } else {
    // console.log(cart)
    if (item.restaurant.toString() !== cart.restaurant.toString()) {
      throw new ApiError(
        400,
        `Your cart contains dishes from ${cart.restaurant}. Do you want to discard the selection and add dishes from ${item.restaurant}`
      );
    } else {
      // Check if item  already exists in cart
      const existingItem = cart.items.find((i) => i.item.toString() === itemId);

      if (existingItem) {
        // Update quantity
        existingItem.quantity += 1;

        // Update subTotal for the item
        existingItem.subTotal += existingItem.price;

        // Update totalBill
        cart.totalBill += existingItem.price;
      } else {
        // Add new item
        cart.items.push({
          item: itemId,
          quantity,
          price: item.price,
          subTotal,
        });
        // Update totalBill
        cart.totalBill += subTotal;
      }
    }
  }

  await cart.save();

  return res.status(201).json(new ApiResponse(200, cart, "Item added to cart."));
});

// Remove from cart
const removeFromCart = AsyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found!");
  }

  const updatedItemsArray = cart.items.filter(
    (item) => item._id.toString() !== itemId.toString()
  );

  let updatedTotalBill = 0;

  for (let i = 0; i < updatedItemsArray.length; i++) {
    updatedTotalBill += updatedItemsArray[i].subTotal;
  }

  cart.items = updatedItemsArray;
  cart.totalBill = updatedTotalBill;

  await cart.save();

  return res
    .status(201)
    .json(new ApiResponse(201, cart, "Item removed from cart."));
});

// Delete Cart
const deleteCart = AsyncHandler(async (req, res) => {
  const {cartId} = req.params;

  const cart = await Cart.findByIdAndDelete(cartId);

  return res
  .status(200)
  .json(new ApiResponse(200, "Cart deleted."))
})

// Get cart by user
const getCart = AsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId })
    .sort({ createdAt: -1 })
    .populate("items.item", "name");

  if (!cart) {
    throw new ApiError(404, "Cart not found!");
  }

  return res.status(201).json(new ApiResponse(201, cart, "Your cart."));
});

// Increase item quantity
const increaseItemQuantity = AsyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });
  if (!cart) throw new ApiError(404, "Cart not found!");

  const updatingItem = cart.items.find((item) => item._id.toString() === itemId);

  if (updatingItem) {
    // Update quantity
    updatingItem.quantity += 1;
    // Update subTotal
    updatingItem.subTotal += updatingItem.price;
    // Update totalBill
    cart.totalBill += updatingItem.price;
  }

  await cart.save();

  return res.status(201).json(new ApiResponse(200, cart, "Quantity increase."));
});

// Decrease item quantity
const decreaseItemQuantity = AsyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });
  if (!cart) throw new ApiError(404, "Cart not found!");

 const updatingItem = cart.items.find((item) => item._id.toString() === itemId);

  if (updatingItem) {
    // Update quantity
    updatingItem.quantity -= 1;
    // Update subTotal
    updatingItem.subTotal -= updatingItem.price;
    // Update totalBill
    cart.totalBill -= updatingItem.price;
  }

  await cart.save();

  return res.status(201).json(new ApiResponse(200, cart, "Quantity increase."));
});

export {
  addToCart,
  removeFromCart,
  getCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteCart
};
