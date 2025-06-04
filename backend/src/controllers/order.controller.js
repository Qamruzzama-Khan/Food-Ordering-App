import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { Restaurant } from "../models/restaurant.model.js";

// Create order from cart
const createOrderFromCart = AsyncHandler(async (req, res) => {
  const { cartId } = req.params;
  const userId = req.user._id;
  const { shippingInfo, paymentMethod } = req.body;

  // Check if order is already placed
  const order = await Order.findOne({ cartId });
  if (order) {
    throw new ApiError(400, "Order already placed.");
  }

  // Fetch the user's cart
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiError(404, "Cart not found!");
  }

  // Check if userId is equal to cart.userId
  if (cart.userId.toString() !== userId.toString()) {
    throw new ApiError(400, "Cart not found!");
  }

  // Create the order from cart details
  const newOrder = await Order.create({
    userId,
    items: cart.items.map((item) => ({
      item: item.item,
      price: item.price,
      quantity: item.quantity,
      subTotal: item.subTotal,
    })),
    totalItems: cart.items.length,
    totalBill: cart.totalBill,
    shippingInfo,
    paymentMethod,
    restaurant: cart.restaurant,
  });

  // Find created order
  const createdOrder = await Order.findById(newOrder._id);
  if (!createdOrder) {
    throw new ApiError(404, "Order did not placed");
  }

  await Cart.findByIdAndDelete(cartId);

  return res
    .status(201)
    .json(new ApiResponse(200, createdOrder, "Order placed successfully"));
});

// Get one order
const getOneOrder = AsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (userId.toString() !== order.userId.toString()) {
    throw new ApiError(400, "Sorry this is not your order!");
  }

  return res.status(201).json(new ApiResponse(200, order));
});

// Get orders by user
const getOrdersByUser = AsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  if (!orders) {
    throw new ApiError(404, "Orders not found");
  }
  return res.status(201).json(new ApiResponse(200, orders));
});

// Get orders by restaurant
const getOrdersByRestaurant = AsyncHandler(async (req, res) => {
  const userId = req.user._id;
  //  owner: user._id
  const { restaurantId } = req.params;

  const restaurant = await Restaurant.findById(restaurantId);

  if (userId.toString() !== restaurant.owner.toString()) {
    throw new ApiError(404, "Sorry only owner can access orders!");
  }

  const orders = await Order.find({ restaurant: restaurantId }).sort({
    createdAt: -1,
  });
  if (!orders) {
    throw new ApiError(404, "Orders not found");
  }
  return res.status(201).json(new ApiResponse(200, orders));
});

// Update order status
const updateOrderStatus = AsyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.status = status;

  await order.save();

  return res
    .status(201)
    .json(new ApiResponse(200, order, `Order status updated to ${status}`));
});

export {
  createOrderFromCart,
  getOneOrder,
  getOrdersByUser,
  getOrdersByRestaurant,
  updateOrderStatus,
};
