import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getRestaurant } from "../../services/api/restaurant";
import { useAuthContext } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { updateRestaurant } from "../../services/api/user";
import { jwtDecode } from "jwt-decode";

const EditRestaurant = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

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

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await getRestaurant(restaurantId);
        const data = response.data.data;
        setForm({
          restaurantName: data.restaurantName || "",
          coverImage: null,
          address: {
            line1: data.address.line1 || "",
            line2: data.address.line2 || "",
            city: data.address.city || "",
            state: data.address.state || "",
            country: data.address.country || "",
          },
          contactNumber: data.contactNumber || "",
        });
        setImagePreview(data.coverImage?.imageUrl || null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch restaurant details.");
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

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
    if (decoded.exp < Date.now() / 1000) {
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
      const response = await updateRestaurant(user?.accessToken, formDataToSend, restaurantId);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
      });

      setIsSubmitting(false);
      navigate("/profile/dashboard", {state: {updated: true}});   
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-4 rounded space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Edit Restaurant</h2>

      {/* Cover Image Preview */}
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

      {/* Error Message */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-all cursor-pointer"
      >
        {isSubmitting ? "Updating..." : "Update Restaurant"}
      </button>
    </form>
  );
};

export default EditRestaurant
  