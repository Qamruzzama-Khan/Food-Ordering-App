import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { searchRestaurantsByCityOrRestaurantName } from "../services/api/restaurant";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchRestaurants = async (e) => {
    e.preventDefault();
    if(searchQuery.trim()){
     navigate("/search/results", {state: {query: searchQuery.trim()}});
    } else {
        window.alert("Please enter a search query!");
    }
  }

  return (
    <section className="relative h-[500px] md:h-[600px] w-full bg-orange-100">
      {/* Background Image */}
      <img
        src="hero_image.webp"
        alt="Delicious food"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 md:px-12">
        <h1 className="text-3xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
          Get Fresh & Tasty Food Delivered to Your Door
        </h1>
        <p className="text-lg md:text-xl text-orange-100 mt-4 max-w-xl">
          Explore your favorite meals and order in seconds. Fast delivery from top restaurants near you!
        </p>

        {/* Visible Search Bar */}
        <div className="mt-6 w-full md:w-[70%] xl:w-[50%] flex items-center gap-2 justify-between">
          <div className="relative w-full">
            <input
            value={searchQuery}
            onChange={handleChange}
              type="text"
              placeholder="Search for restaurants and explore menu..."
              className="w-full pl-10 md:pl-12 pr-4 py-3 rounded-full bg-white text-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {/* search-btn */}
          <button className="cursor-pointer px-6 py-3 bg-white rounded-full hover:bg-gray-100 font-medium text-gray-700" onClick={handleSearchRestaurants}>search</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
