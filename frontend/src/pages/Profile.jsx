import { useAuthContext } from "../hooks/useAuth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/")
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  return (
    <div>
      {/* mobile-view */}
      <div className="mt-2 md:hidden">
        {/* div-1 profile */}
        <div className="flex items-start justify-between p-2">
          <div>
            <div className="flex items-end w-fit gap-1">
              {/* profile-icon */}
              <FaUser className="text-3xl text-gray-500 mx-auto" />
              {/* username */}
              <span className="text-gray-700">{user && user?.user?.username}</span>
            </div>
            {/* logout-btn */}
            <button
              className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-1 rounded-lg mt-3 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <button
            className="text-orange-500 font-semibold uppercase hover:text-orange-600 cursor-pointer"
            onClick={() => navigate("/profile/edit-profile")}
          >
            Edit
          </button>
        </div>
        <hr className="mt-3 text-gray-400" />
         <ul className="flex flex-col gap-2 mt-2">
              <li className="px-2">
                <Link to="/profile/my-placed-orders">My Orders</Link>
              </li>
                 <hr className=" text-gray-400" />
              {user && !user?.user?.isRestaurantOwned ? (
                <li className="px-2">
                  <Link to="/profile/create-restaurant">Create Restaurant</Link>
                </li>
              ) : (
                 <li className="px-2">
                  <Link to="/profile/dashboard">Dashboard</Link>
                </li>
              )}
            </ul>
        <hr className="mt-3 text-gray-400" />
        {/* div-2 */}
        <div className="mt-3">
          <Outlet />
        </div>
      </div>

      {/* dekstop-view */}
      <div className="hidden md:flex justify-between">
        {/* 1-div side bar*/}
        <div className="w-[30%] xl:w-[20%] min-h-screen bg-gray-100 p-3">
          <div className="flex flex-col gap-2 mt-2">
            {/* profile-icon */}
            <FaUser className="text-5xl text-gray-500 mx-auto" />
            {/* username */}
            <p className="text-gray-700 font-semibold text-lg text-center">
              {user && user.user.username}
            </p>
            <ul className="flex flex-col mt-4">
              <li className="hover:bg-gray-300 p-2 rounded cursor-pointer" onClick={() => navigate("/profile/placed-orders")}>
                My Orders
              </li>
                <li className="hover:bg-gray-300 p-2 rounded cursor-pointer" onClick={() => navigate(user && !user?.user?.isRestaurantOwned ? "/profile/create-restaurant" : "/profile/dashboard")}>
                  {user && !user?.user?.isRestaurantOwned ? 'Create Restaurant' : 'Dashboard'}
                </li>
            </ul>
            {/* buttons-div */}
            <div className="mt-2">
              {/* logout-btn */}
              <button
                className="bg-orange-500 text-white p-2 rounded w-full cursor-pointer hover:bg-orange-600 hover:text-whitef"
                onClick={handleLogout}
              >
                Logout
              </button>
              {/* edit-btn */}
              <button
                className="bg-orange-500 text-white mt-2 p-2 rounded w-full cursor-pointer hover:bg-orange-600 hover:text-whitef"
                onClick={() => navigate("/profile/edit-profile")}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        {/* div-2 */}
        <div className="w-full md:w-[70%] xl:w-[80%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
