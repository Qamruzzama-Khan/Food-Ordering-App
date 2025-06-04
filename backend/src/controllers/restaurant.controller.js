import { Restaurant } from "../models/restaurant.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { uploadCloudinary, deleteCloudinary } from "../utils/Cloudinary.js";

// Create Restaurant
const createRestaurant = AsyncHandler(async (req, res) => {
  const user = req.user;
  const { restaurantName, contactNumber, address } = req.body;
  const coverImageLocalPath = req.file?.path;

  //   Check if restaurant already exists, for this user with same restaurantName
  const existingRestaurant = await Restaurant.findOne({
    owner: user._id,
    restaurantName,
  });

  if (existingRestaurant) {
    throw new ApiError(400, "You already have a restaurant with this name.");
  }

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image is required");
  }

  const coverImage = await uploadCloudinary(coverImageLocalPath);
  if (!coverImage) {
    throw new ApiError(400, "Error while uploading image on cloudinary");
  }

  const newRestaurant = await Restaurant.create({
    owner: user._id,
    restaurantName,
    coverImage: {
      imageUrl: coverImage.url,
      imageId: coverImage.public_id,
    },
    address,
    contactNumber,
  });

  user.isRestaurantOwned = true
  await user.save();

  return res
    .status(201)
    .json(
      new ApiResponse(201, newRestaurant, "Restaurant created successfully.")
    );
});

// Get All Restaurants
const getRestaurants = AsyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find().sort({ createdAt: -1 });

  return res.status(201).json(new ApiResponse(200, restaurants));
});

// Get Approved Restaurants
const getApprovedRestaurants = AsyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find({isApproved: true}).sort({ createdAt: -1 });

  return res.status(201).json(new ApiResponse(200, restaurants));
});

// Get One Restaurant
const getRestaurant = AsyncHandler(async (req, res) => {
  const { restaurantId } = req.params;

  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found!");
  }

  return res.status(201).json(new ApiResponse(200, restaurant));
});

// Restaurant Approval
const restaurantApproval = AsyncHandler(async (req, res) => {
  const { restaurantId } = req.params;

  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found!");
  }

  restaurant.isApproved = !restaurant.isApproved;

  await restaurant.save();

  return res
    .status(201)
    .json(new ApiResponse(200, restaurant, `${restaurant.isApproved ? "Restaurant approved" : "Restaurant not approved"}`));
});

// Get Restaurant
const getRestaurantByUser = AsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const restaurant = await Restaurant.findOne({owner: userId});

  return res
  .status(200)
  .json(new ApiResponse(200, restaurant, "Your restaurant."))
})

// Update Restaurant
const updateRestaurant = AsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { restaurantId } = req.params;
  const { restaurantName, contactNumber, address } = req.body;
  const coverImageLocalPath = req.file?.path;

  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found!");
  }

  if (userId.toString() !== restaurant.owner.toString()) {
    throw new ApiError(404, "Only owner can update the restaurant details!");
  }

  const updatedFields = {};
  if (restaurantName) updatedFields.restaurantName = restaurantName;
  if (contactNumber) updatedFields.contactNumber = contactNumber;
  if (address) updatedFields.address = address;

  if (coverImageLocalPath) {
    const publicId = restaurant.image?.imageId;

    // Delete old image if exists
    if (publicId) {
      try {
        await deleteCloudinary(publicId);
      } catch (error) {
        throw new ApiError(500, "Error deleting old image");
      }
    }

    try {
      const coverImage = await uploadCloudinary(coverImageLocalPath);
      updatedFields.coverImage = {
        imageUrl: coverImage.url,
        imageId: coverImage.public_id,
      };
    } catch (error) {
      throw new ApiError(500, "Error uploading new image");
    }
  }

  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    restaurantId,
    { $set: updatedFields },
    { new: true }
  );

  return res
    .status(201)
    .json(
      new ApiResponse(200, updatedRestaurant, "Restaurant updated successfully")
    );
});

// Delete Restaurant
const deleteRestaurant = AsyncHandler(async (req, res) => {
  const user = req.user;
  const { restaurantId } = req.params;

  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found!");
  }

  if (user._id.toString() !== restaurant.owner.toString()) {
    throw new ApiError(404, "Only owner can delete the restaurant!");
  }

  // Delete image if exists
  const publicId = restaurant.image?.imageId;
  if (publicId) {
    try {
      await deleteCloudinary(publicId);
    } catch (error) {
      throw new ApiError(500, "Error deleting old image");
    }
  }

  await Restaurant.findByIdAndDelete(restaurantId);

   user.isRestaurantOwned = false
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(200, "Restaurant deleted successfully"));
});

// Search restaurants by city or restaurant name
const searchRestaurantsByCityOrRestaurantName = AsyncHandler(async (req, res) => {
  const query = req.query.query;
  const regex = new RegExp(query, 'i'); // case-insensitive

  const restaurants = await Restaurant.find({
   $or: [
    { "address.city": {$regex: regex} },
    { restaurantName : {$regex: regex} },
   ]
  }).sort({createdAt: -1})

  if(restaurants.length === 0 ){
    throw new ApiError(404, "Restaurant not found!")
  }

  return res
  .status(201)
  .json(new ApiResponse(200, restaurants, "Your searched restaurants."));
})

export {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  getRestaurantByUser,
  updateRestaurant,
  deleteRestaurant,
  getApprovedRestaurants,
  restaurantApproval,
  searchRestaurantsByCityOrRestaurantName
};
