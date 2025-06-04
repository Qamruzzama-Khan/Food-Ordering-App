import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { updateItem } from "../../services/api/user";
import { useAuthContext } from "../../hooks/useAuth";
import { getItem } from "../../services/api/item";
import { toast } from "react-toastify";

const EditItem = () => {
  const { itemId } = useParams();
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
    type: "",
    price: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getOneItem = async () => {
      const response = await getItem(itemId);
      setForm(response.data.data);
      setImagePreview(response.data.data.image.imageUrl);
    };
    getOneItem();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // handling file input
    if (name === "image" && files) {
      const newFile = files[0];

      setForm((prevForm) => ({
        ...prevForm,
        image: newFile,
      }));

      // update image preview and
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(newFile);
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = user?.accessToken;

    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // in seconds

      if (decoded.exp < currentTime) {
        // Token expired
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      } else {
        const formDataToSend = new FormData();
        Object.keys(form).forEach((key) => {
          formDataToSend.append(key, form[key]);
        });

        try {
          setIsSubmitting(true);
          const response = await updateItem(
            formDataToSend,
            user?.accessToken,
            itemId
          );
          setIsSubmitting(false);
          setForm({
            name: "",
            description: "",
            image: null,
            type: "",
            price: null,
          });
          setImagePreview(null);
          toast(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate(-1);
        } catch (error) {
          setError(error.response.data.message);
          setIsSubmitting(false);
        }
      }
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 w-full mx-auto">
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Image Section */}
          <div className="w-full md:w-[300px] flex justify-center relative">
            {/* Label for Image Input */}
            <label htmlFor="image" className="cursor-pointer relative group">
              {/* Image Preview */}
              {imagePreview ? (
                <img
                  className="h-[200px] w-[300px] mx-auto rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 object-cover"
                  src={imagePreview}
                  alt="product-image"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-[200px] h-[200px] border-4 border-dashed border-gray-300 rounded-lg shadow-md bg-gray-50 group-hover:bg-green-50 transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl text-gray-600 group-hover:text-orange-500 transition-all duration-300">
                    add_image
                  </span>
                  <span className="text-gray-500 mt-2 group-hover:text-orange-600 transition-all duration-300">
                    Click to upload
                  </span>
                </div>
              )}

              {/* Input for selecting image */}
              <input
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                type="file"
                name="image"
                id="image"
              />
            </label>
          </div>

          {/* Form Inputs */}
          <div className="flex flex-col w-full gap-2 xl:w-[80%]">
            {/* Name */}
            <input
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none"
              type="text"
              name="name"
              placeholder="Name"
            />
            {/* Description */}
            <input
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none"
              type="text"
              name="description"
              placeholder="Description"
            />
            {/* type */}
            <select
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none"
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
            {/* Price */}
            <input
              value={form.price}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none"
              type="number"
              name="price"
              placeholder="Price"
            />

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-lg font-medium mt-2">
                {error}...
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition-all duration-300 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditItem;
