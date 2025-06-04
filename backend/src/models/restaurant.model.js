import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    restaurantName: {
      type: String,
      required: true,
    },
    coverImage: {
      imageUrl: {
        type: String,
        required: true,
      },
      imageId: {
        type: String,
        required: true,
      },
    },
    address: {
      line1: {
        type: String,
        required: true,
      },
      line2: {
        type: String, // Optional address line
        required: false,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    contactNumber: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
