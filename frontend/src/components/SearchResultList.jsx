import RestaurantCard from "./restaurant/RestaurantCard"

const SearchResultList = ({restaurants}) => {
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

export default SearchResultList
