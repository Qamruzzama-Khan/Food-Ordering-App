import Footer from "../components/Footer"
import Hero from "../components/Hero"
import RestaurantList from "../components/restaurant/RestaurantList"

const Home = () => {

  return (
    <div>
      <Hero />
    <div className="p-2 md:px-15 pb-5">
      <RestaurantList />
    </div>
    <Footer />
    </div>
  )
}

export default Home
