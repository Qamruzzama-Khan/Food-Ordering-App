import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { deleteRestaurant } from "../../services/api/user";

const RestaurantProfile = ({ restaurant }) => {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

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
             const confirmDelete = window.confirm(
            "Are you sure you want to delete this restaurant?"
          );
         if(confirmDelete) {
           const response = await deleteRestaurant(user?.accessToken, restaurant._id);
             const updatedUser = {
            ...user,
            user: {
              ...user.user,
              isRestaurantOwned: false,
            },
          };

          dispatch({
            type: "UPDATE_PROFILE",
            payload: updatedUser
          });

          localStorage.setItem("user", JSON.stringify(updatedUser));
            toast("Restaurant deleted successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          navigate("/")
         }
        }
        }
    };

  return (
    <div>
      <div className="flex items-start justify-between mt-4 p-2 md:px-4">
        <div className="flex flex-col">
         <div className="flex items-center gap-8 sm:justify-between">
           {/* rest-name */}
          <h1 className="text-xl md:text-2xl text-gray-800 font-bold capitalize">
            {restaurant.restaurantName}
          </h1>
        {user?.user?._id === restaurant.owner && (
          <div className="space-x-2">
              <button className="cursor-pointer" onClick={handleDelete}>
            <MdDelete className="text-xl text-gray-500 hover:text-red-500" />
          </button>
              <button className="cursor-pointer" onClick={() => navigate(`/profile/dashboard/edit-restaurant/${restaurant._id}`)}>
            <FaEdit className="text-xl text-gray-500 hover:text-gray-600" />
          </button>
          </div>
        )}
         </div>
          {/* rest-add */}
          <p className="text-gray-700 text mt-1">
            {restaurant.address.line1}, {restaurant.address.line2},{" "}
            {restaurant.address.city}, {restaurant.address.state},{" "}
            {restaurant.address.country}
          </p>
          <p className="text-gray-700">Contact: {restaurant.contactNumber}</p>
        </div>
        {/* isApproved or not */}
        {user?.user?._id === restaurant.owner && (
          <span
            className={`${
              restaurant.isApproved ? "text-green-500" : "text-red-500"
            } font-semibold`}
          >
            {restaurant.isApproved ? "Approved" : "Not Approved!"}
          </span>
        )}
      </div>
      {/* coverImage */}
      <div className="h-40 md:h-56 mt-2">
        <img
          className="h-40 md:h-56 w-full object-cover"
          src={restaurant.coverImage.imageUrl}
          alt="cover-image"
        />
      </div>
    </div>
  );
};

export default RestaurantProfile;
