import { useEffect, useState } from "react";
import { getAllRestaurants } from "../../services/api/restaurant";
import RestaurantCard from "./RestaurantCard";

const RestaurantList = () => {
       const [restaurants, setRestaurants] = useState()
    
        useEffect(() => {
            const getRestaurants = async () => {
                const response = await getAllRestaurants();
                setRestaurants(response.data.data);
                console.log(response.data.data);
            }
            getRestaurants();
        }, [])

  return (
    <div>
      <h1 className="text-gray-500 px-2 py-4 text-lg md:text-xl">Explore popular restaurants</h1>
      <div className="flex flex-wrap  gap-4">
        {restaurants && restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant._id} restaurant={restaurant} />
      ))}
      </div>
    </div>
  )
}

export default RestaurantList
