import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyAdmin = AsyncHandler(async (req, _, next) => {
  try {
    if (req.user.status === "admin") {
      next();
    } else {
      throw new ApiError(401, "Sorry you are not admin...!");
    }
  } catch (error) {
    throw new ApiError(401, error?.message || "something went wrong...!");
  }
});
