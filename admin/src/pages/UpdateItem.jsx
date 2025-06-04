import { useState } from "react";
import { useAuthContext } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { getItem, updateItem } from "../services/api/item";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateItem = () => {
  const { itemId } = useParams();
  const { user, dispatch } = useAuthContext();
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    price: null,
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

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
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      } else {
         const formDataToSend = new FormData();
        Object.keys(form).forEach((key) => {
          formDataToSend.append(key, form[key]);
        });
        try {
          setIsSubmitting(true);
          const response = await updateItem(user?.accessToken, formDataToSend, itemId);
          console.log(response.data.data);
          setIsSubmitting(false);
          setForm({
            name: "",
            description: "",
            type: "",
            price: null,
          });
          navigate("/");
        } catch (error) {
          setError(error.response.data.message);
          setIsSubmitting(false);
        }
      }
    }
  };

  return (
     <div className="p-2 md:p-5 mt-5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-4"
      >
          {/* Image Section */}
          <div className="w-full md:w-1/3 flex justify-center relative">
            {/* Label for Image Input */}
            <label htmlFor="image" className="cursor-pointer relative group">
              {/* Image Preview */}
              {imagePreview ? (
                <img
                  className="h-[170px] w-[170px] mx-auto rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 object-contain"
                  src={imagePreview}
                  alt="product-image"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-[170px] h-[170px] border-4 border-dashed border-gray-300 rounded-lg shadow-md bg-gray-50 group-hover:bg-orange-50 transition-all duration-300">
                  <span className="material-symbols-outlined text-xl text-gray-600 group-hover:text-orange-500 transition-all duration-300">
                    add_a_photo
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
          {/* text-info */}
      <div className="flex flex-col items-center gap-2 w-full">
          {/* name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border border-gray-300 p-2 rounded w-full"
          value={form.name}
          onChange={handleChange}
        />
        {/* desc */}
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="border border-gray-300 p-2 rounded w-full"
          value={form.description}
          onChange={handleChange}
        />
        {/* type */}
        <select
          className="border border-gray-300 p-2 rounded cursor-pointer w-full"
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="" disabled>
            Type
          </option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-veg</option>
        </select>
        {/* price */}
        <input
          type="number"
          placeholder="Price"
          name="price"
          className="border border-gray-300 p-2 rounded w-full"
          value={form.price}
          onChange={handleChange}
        />
         {/* Error Message */}
            {error && (
              <div className="text-red-600 text-lg font-medium mt-2">
                {error}...
              </div>
            )}
            {/* submit-btn */}
        <button
          type="submit"
          className="p-2 text-white font-semibold bg-orange-500 hover:bg-orange-600 rounded w-full cursor-pointer"
        >
           {isSubmitting ? "Updating..." : "Update"}
        </button>
      </div>
      </form>
    </div>
  );
};

export default UpdateItem;
