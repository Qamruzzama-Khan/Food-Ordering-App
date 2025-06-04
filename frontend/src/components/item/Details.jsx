import { useNavigate } from "react-router-dom";
import { addToCart } from "../../services/api/cart";
import { jwtDecode } from "jwt-decode";
import { inrFormat } from "../../utils/InrFormat";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import { useAuthContext } from "../../hooks/useAuth";
import { deleteItem } from "../../services/api/user";
import { toast } from "react-toastify";

const Details = ({ item }) => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleAddToCart = async (itemId) => {
    if (user) {
      const token = user?.accessToken;
      if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds

        if (decoded.exp < currentTime) {
          localStorage.removeItem("user");
          dispatch({ type: "LOGOUT" });
          navigate("/auth");
        } else {
          try {
            setIsSubmitting(true);
            const response = await addToCart(user?.accessToken, itemId);
            setIsSubmitting(false);
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
            navigate("/cart");
          } catch (error) {
            setError(error.response.data.message);
            setIsSubmitting(false);
          }
        }
      }
    } else {
      navigate("/auth");
    }
  };

  const handleDelete = async () => {
      const token = user?.accessToken;

      if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds

        if (decoded.exp < currentTime) {
          // Token expired
          localStorage.removeItem("user");
          dispatch({ type: "LOGOUT" });
        } else {
        const response = await deleteItem(item._id, user?.accessToken);
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
        navigate(-1)
      }
      }
  };

  return (
    <div className="p-2 md:p-5 mt-4">
      <div className="lg:w-[70%] lg:mx-auto flex flex-col md:flex-row md:gap-4">
        {/* image */}
        <img
          className="h-[180px] md:h-70  w-auto mx-auto rounded shadow-lg md:shadow-2xl"
          src={item.image.imageUrl}
          alt="image"
        />
        <div>
          {/* name */}
          <p className="text-lg md:text-xl text-gray-800 font-semibold mt-6 md:mt-0 text-center md:text-left">
            {item.name}
          </p>
          {/* price */}
          <p className="text-lg text-gray-600 mt-2 text-center md:text-left">
            Price: {inrFormat(item.price)}
          </p>
          {/* desc */}
          <p className="md:text-lg text-gray-600 mt-1 text-center md:text-left">
            {item.description}
          </p>
        {user?.user?._id === item.owner ? <div className="text-xl mt-2 flex items-center justify-between text-gray-600">
          <button className="cursor-pointer" onClick={() => navigate(`/profile/dashboard/edit-item/${item._id}`)}><FaEdit className="hover:text-gray-700" /></button>
          <button className="cursor-pointer" onClick={handleDelete}><MdDelete className="hover:text-red-500" /></button>
        </div> : 
          <button
            className="bg-orange-500 p-2 rounded text-white cursor-pointer mt-3 hover:bg-orange-600 w-full md:w-fit"
            disabled={isSubmitting}
            onClick={() => handleAddToCart(item._id)}
          >
            Add to cart
          </button>}
        </div>
      </div>
    </div>
  );
};

export default Details;
