import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { searchRestaurantsByCityOrRestaurantName } from "../services/api/restaurant";
import SearchResultList from "../components/SearchResultList";

const SearchResults = () => {
    const location = useLocation();
    const query = location.state?.query || "";
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            if(!query) return;
            try {
                const response = await searchRestaurantsByCityOrRestaurantName(query);
                setRestaurants(response.data.data);
            } catch (error) {
                console.error("Error fetching search results: ", error);
            } finally {
                setLoading(false);
            }
        }
        fetchResults();
    }, [query])

  return (
      <div className="p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold mb-4">
        Search Results for “{query}”
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : restaurants.length ? (
        <SearchResultList restaurants={restaurants} />
      ) : (
        <p>No results found.</p>
      )}
    </div>
  )
}

export default SearchResults
