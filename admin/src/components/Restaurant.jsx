import { useAuthContext } from "../hooks/useAuth";

const Restaurant = ({ restaurant, index, handleRestaurantApproval }) => {
  const { user } = useAuthContext();

  return (
    <tr>
      <td className=" px-4 py-2">{index + 1}</td>
      <td className=" px-4 py-2">{restaurant.restaurantName}</td>
      <td className=" px-4 py-2">{restaurant.contactNumber}</td>
      <td className="px-4 py-2">
        {restaurant.isApproved ? "Approved" : "Not Approved"}
      </td>
      <td className="px-4 py-2">
       <button className="bg-gray-300 px-5 py-1 rounded-full hover:bg-gray-400 cursor-pointer" onClick={(e) => handleRestaurantApproval(e, restaurant, user?.accessToken)}>
         {restaurant.isApproved ? "No" : "Yes"}
       </button>
      </td>
    </tr>
  );
};

export default Restaurant;
