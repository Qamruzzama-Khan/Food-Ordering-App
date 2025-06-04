import { useEffect } from "react";
import { useState } from "react";
import Restaurant from "../components/Restaurant";
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../hooks/useAuth";
import { getRestaurants, restaurantApproval } from "../services/api/admin";

const Home = () => {
  const [restaurants, setRestaurants] = useState();
  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    const getAllRestaurants = async () => {
      const response = await getRestaurants(user?.accessToken);
      console.log(response.data.data);
      setRestaurants(response.data.data);
    };
    getAllRestaurants();
  }, []);

  const handleRestaurantApproval = async (e, restaurant) => {
    e.preventDefault();
    const token = user?.accessToken;
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // in seconds

      if (decoded.exp < currentTime) {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      } else {
        try {
          const confirmApproval = window.confirm(
            `Are you sure you want to ${restaurant.isApproved ? "not approve" : "approve"} this restaurant?`
          );
          if (confirmApproval) {
            const response = await restaurantApproval(restaurant._id, user?.accessToken);
            const updatedApprovalRestaurantId = response.data.data._id;
             const updatedRestaurants = restaurants.map((restaurant) => restaurant._id === updatedApprovalRestaurantId ? {...restaurant, isApproved: !restaurant.isApproved} : restaurant)
            setRestaurants(updatedRestaurants);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="mt-5 md:p-5 md:mt-0">
      <h1 className="p-2 text-lg text-gray-600">Restaurants</h1>
      <div className="overflow-x-auto">
        {restaurants && restaurants.length > 0 && (
          <table className=" border-collaps  min-w-full">
            <thead className="text-left">
              <tr className="bg-orange-500 text-white">
                <th className=" px-4 py-2 font-semibold">Sr.No</th>
                <th className=" px-4 py-2 font-semibold">Restaurant Name</th>
                <th className=" px-4 py-2 font-semibold">Contact</th>
                <th className=" px-4 py-2 font-semibold">Status</th>
                <th className=" px-4 py-2 font-semibold">Approval</th>
              </tr>
            </thead>
            <tbody className="text-left">
              {restaurants.map((restaurant, index) => (
                <Restaurant
                  key={restaurant._id}
                  restaurant={restaurant}
                  index={index}
                  handleRestaurantApproval={handleRestaurantApproval}
                />
              ))}
            </tbody>
          </table>
        )}
        {restaurants && restaurants.length === 0 && <p>No items added!</p>}
      </div>
    </div>
  );
};

export default Home;
