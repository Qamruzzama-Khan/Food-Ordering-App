import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuth";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getRestaurantByUser } from "../../services/api/user";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [restaurant, setRestaurant] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("home");

  useEffect(() => {
    const getMyRestaurant = async () => {
      const response = await getRestaurantByUser(user?.accessToken);
      setRestaurant(response.data.data);
    };
    getMyRestaurant();
  }, [location.state?.updated]); // <- triggers on update

  // By default navigation
  useEffect(() => {
    if (location.pathname.includes("add-item")) setSelectedTab("add-item");
    else if (location.pathname.includes("orders/:restaurantId")) setSelectedTab("orders");
    else setSelectedTab("home");
  }, [location.pathname]);

  // navigation
  const handleNavigation = (e) => {
    const selected = e.target.value;
    setSelectedTab(selected);

    if (selected === "home") navigate("home");
    else if (selected === "orders") navigate(`orders/${restaurant._id}`);
    else if (selected === "add-item") navigate("add-item");
  };

  return (
    <div className="mt-4">
      {restaurant && (
        <div>
          {/* div-1 */}
          <div className="flex">
            {/* select-list for navigation */}
            <select
              className="ml-auto w-40 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700 cursor-pointer"
              value={selectedTab}
              onChange={handleNavigation}
            >
              <option value="home">Home</option>
              {restaurant?.isApproved && (
                <option value="add-item">Add Item</option>
              )}
              {restaurant?.isApproved && <option value="orders">Orders</option>}
            </select>
          </div>

          {/* child-component */}
          <div className="mt-3">
            <Outlet context={restaurant} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
