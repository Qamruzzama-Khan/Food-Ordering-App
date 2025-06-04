import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import RestaurantProfile from "../../components/restaurant/RestaurantProfile";
import List from "../../components/item/List";

const MyRestaurant = () => {
      const restaurant = useOutletContext();

      useEffect(() => {
        console.log(restaurant)
      }, [])

  return (
    <div>
      <RestaurantProfile restaurant={restaurant} />
    <div className="md:px-3 mt-4">
          <List restaurantId={restaurant._id} />
    </div>
    </div>
  )
}

export default MyRestaurant
