import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemsList from "../components/item/List";
import RestaurantProfile from "../components/restaurant/RestaurantProfile";
import { getRestaurant } from "../services/api/restaurant";

const Restaurant = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    const getOneRestaurant = async () => {
      const response = await getRestaurant(restaurantId);
      setRestaurant(response.data.data);
    };
    getOneRestaurant();
  }, []);

  return (
    <div>
      {restaurant && (
        <div>
          <RestaurantProfile restaurant={restaurant} />
          {/* items */}
          <div className="mt-4">
            <h1 className="px-2 md:px-5 pb-3 text-lg md:text-xl text-gray-600">Popular dishes for you</h1>
            <ItemsList restaurantId={restaurantId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
