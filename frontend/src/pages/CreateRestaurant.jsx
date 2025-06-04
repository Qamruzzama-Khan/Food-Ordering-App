import { useState } from "react";
import { createRestaurant } from "../services/api/restaurant";
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateRestaurant = () => {
  const [form, setForm] = useState({
    restaurantName: "",
    coverImage: null,
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
    },
    contactNumber: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "coverImage" && files) {
      const file = files[0];
      setForm((prev) => ({ ...prev, coverImage: file }));

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else if (name in form.address) {
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = user?.accessToken;

    if (!token) return;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("restaurantName", form.restaurantName);
    formDataToSend.append("contactNumber", form.contactNumber);
    if (form.coverImage) {
      formDataToSend.append("coverImage", form.coverImage);
    }
    Object.entries(form.address).forEach(([key, value]) => {
      formDataToSend.append(`address[${key}]`, value);
    });

    try {
      setIsSubmitting(true);
      const response = await createRestaurant(token, formDataToSend);

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
      });

      const updatedUser = {
        ...user,
        user: {
          ...user.user,
          isRestaurantOwned: true,
        },
      };

      dispatch({ type: "UPDATE_PROFILE", payload: updatedUser });
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setForm({
        restaurantName: "",
        coverImage: null,
        address: {
          line1: "",
          line2: "",
          city: "",
          state: "",
          country: "",
        },
        contactNumber: "",
      });

      setImagePreview(null);
      setIsSubmitting(false);
      navigate("/profile/dashboard");
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-4 rounded space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Create Restaurant</h2>

      {/* Cover Image Upload */}
      <div className="flex flex-col gap-2">
        <label className="font-medium">Cover Image</label>
        <label className="cursor-pointer group relative">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Cover Preview"
              className="w-full h-48 object-cover rounded-md shadow"
            />
          ) : (
            <div className="h-48 bg-gray-100 border border-dashed border-gray-400 flex items-center justify-center rounded-md">
              <span className="text-gray-500">Click to upload cover image</span>
            </div>
          )}
          <input
            type="file"
            name="coverImage"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {/* Restaurant Name */}
      <div>
        <label className="block font-medium mb-1">Restaurant Name</label>
        <input
          type="text"
          name="restaurantName"
          value={form.restaurantName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      {/* Contact Number */}
      <div>
        <label className="block font-medium mb-1">Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          value={form.contactNumber}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      {/* Address Fields */}
      {["line1", "line2", "city", "state", "country"].map((field) => (
        <div key={field}>
          <label className="block font-medium mb-1 capitalize">
            {field === "line1" || field === "line2"
              ? `Address ${field === "line1" ? "Line 1" : "Line 2 (Optional)"}`
              : field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type="text"
            name={field}
            value={form.address[field]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required={field !== "line2"}
          />
        </div>
      ))}

      {/* Error */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-all cursor-pointer"
      >
        {isSubmitting ? "Creating..." : "Create Restaurant"}
      </button>
    </form>
  );
};

export default CreateRestaurant;
