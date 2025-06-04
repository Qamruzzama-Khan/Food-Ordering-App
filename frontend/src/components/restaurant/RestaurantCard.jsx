import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
    const navigate = useNavigate();

  return (
    <div className="bg-gray-50 shadow-md rounded-lg border border-gray-300 overflow-hidden transition transform hover:scale-105 duration-300 w-[260px] mx-auto sm:mx-0">
      {/* Restaurant Image */}
      <img
        className="w-full h-36 object-cover"
        src={restaurant.coverImage.imageUrl}
        alt="restaurant"
      />

      {/* Content */}
      <div className="p-2">
        <h2 className="md:text-lg font-semibold text-orange-500 capitalize">
          {restaurant.restaurantName}
        </h2>
        <p className="text-gray-500 text-sm capitalize">
          {restaurant.address.city}
        </p>
        <div className="flex justify-between items-center text-sm">
          <button className="text-orange-500 hover:underline font-medium ml-auto cursor-pointer" onClick={() => navigate(`/restaurant/${restaurant._id}`)}>
            Visit Restaurant
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
