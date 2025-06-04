import { Item } from "../models/item.model.js";
import { Restaurant } from "../models/restaurant.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { uploadCloudinary, deleteCloudinary } from "../utils/Cloudinary.js";

// Add Item only if current user have an restaurant with same account
const addItem = AsyncHandler(async (req, res) => {
  const { name, description, price, type } = req.body;
  const userId = req.user._id;

  const restaurant = await Restaurant.findOne({owner: userId});

  if(!restaurant) {
    throw new ApiError(404, "Please create restaurant first.")
  }

  if(!restaurant.isApproved){
    throw new ApiError(404, "Sorry your restaurant is not approved please wait...!")
  }

  //   Check if item already exists, for this user with same item name
  const existingItem = await Item.findOne({
    owner: userId,
    name,
  });

  if (existingItem) {
    throw new ApiError(400, "You already have a item with this name.");
  }

  const itemImageLocalPath = req.file?.path;
  if (!itemImageLocalPath) {
    throw new ApiError(400, "Item image is required");
  }

  const itemImage = await uploadCloudinary(itemImageLocalPath);
  if (!itemImage) {
    throw new ApiError(400, "Error while uploading image on cloudinary");
  }

  const newItem = await Item.create({
    name,
    description,
    type,
    price,
    image: {
      imageUrl: itemImage.url,
      imageId: itemImage.public_id,
    },
    restaurant: restaurant._id,
    owner: userId
  });

  return res.status(201).json(new ApiResponse(201, newItem, "Item created."));
});

// Get All Items
const getItems = AsyncHandler(async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  return res.status(201).json(new ApiResponse(201, items, "Items"));
});

// Get Items by restaurant
const getItemsByRestaurant = AsyncHandler(async (req, res) => {
  const {restaurantId} = req.params;

  const items = await Item.find({restaurant: restaurantId}).sort({ createdAt: -1 });

  return res.status(201).json(new ApiResponse(201, items, "Items"));
});

// Get one Item
const getItem = AsyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const item = await Item.findById(itemId);
  if (!item) {
    throw new ApiError(404, "Item not found");
  }

  return res.status(201).json(new ApiResponse(200, item, "Your item"));
});

// Search items by names
const searchItemsByName = AsyncHandler(async (req, res) => {
  const query = req.query.query;
  const regex = new RegExp(query, 'i'); // case-insensitive

  const items = await Item.find({name: {$regex: regex}}).sort({createdAt: -1})
  if(items.length === 0 ){
    throw new ApiError(404, "Item not exist!")
  }

  return res
  .status(201)
  .json(new ApiResponse(200, items, "Your items."));
})

// Update item
const updateItem = AsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, description, price, type } = req.body;
  const { itemId } = req.params;

  const item = await Item.findById(itemId);
  if (!item) {
    throw new ApiError(404, "Item not found!");
  }

  if (item.owner.toString() !== userId.toString()) {
    throw new ApiError(404, "Sorry only owner can update the item details!");
  }

  const updatedFields = {};
  if (name) updatedFields.name = name;
  if (description) updatedFields.description = description;
  if (price) updatedFields.price = price;
  if (type) updatedFields.type = type;

  const itemImageLocalPath = req.file?.path;

  if (itemImageLocalPath) {
    const publicId = item.image?.imageId;

    // Delete old image if exists
    if (publicId) {
      try {
        await deleteCloudinary(publicId);
      } catch (error) {
        throw new ApiError(500, "Error deleting old image");
      }
    }

    try {
      const itemImage = await uploadCloudinary(itemImageLocalPath);
      updatedFields.image = {
        imageUrl: itemImage.url,
        imageId: itemImage.public_id,
      };
    } catch (error) {
      throw new ApiError(500, "Error uploading new image");
    }
  }

  const updatedItem = await Item.findByIdAndUpdate(
    itemId,
    { $set: updatedFields },
    { new: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(200, updatedItem, "Item updated successfully"));
});

// Delete item
const deleteItem = AsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;

  const item = await Item.findById(itemId);
  if (!item) {
    throw new ApiError(404, "Item not found");
  }

  if (item.owner.toString() !== userId.toString()) {
    throw new ApiError(404, "Sorry only owner can delete the item!");
  }

  await Item.findByIdAndDelete(itemId);

  return res
    .status(201)
    .json(new ApiResponse(200, item, "Item deleted successfully"));
});

export { addItem, updateItem, deleteItem, getItems, getItem, getItemsByRestaurant, searchItemsByName };
