import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ItemDetails from "./pages/ItemDetails";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import PlacedOrders from "./pages/PlacedOrders";
import { useAuthContext } from "./hooks/useAuth";
import Profile from "./pages/Profile";
import Dashboard from "./pages/restaurant/Dashboard";
import CreateRestaurant from "./pages/CreateRestaurant";
import Restaurant from "./pages/Restaurant";
import AddItem from "./pages/restaurant/AddItem";
import Orders from "./pages/restaurant/Orders";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import About from "./pages/About";
import MyRestaurant from "./pages/restaurant/MyRestaurant";
import EditRestaurant from "./pages/restaurant/EditRestaurant";
import EditItem from "./pages/restaurant/EditItem";
import { ToastContainer } from "react-toastify";
import SearchResults from "./pages/SearchResults";

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <div className="App">
        {/* Header */}
        <Navbar />

        {/* toast-container */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="text-sm md:text-md"
        />

        {/* Main */}
        <main>
          <Routes>
            {/* Protected /profile route with nested routes */}
            <Route
              path="/profile"
              element={
                  user && <Profile />
              }
            >
              <Route index element={<Navigate to="placed-orders" />} />
              <Route path="placed-orders" element={<PlacedOrders />} />
              <Route path="create-restaurant" element={<CreateRestaurant />} />
              <Route path="dashboard" element={<Dashboard />}>
                <Route index element={<Navigate to="home" />} />
                <Route path="home" element={<MyRestaurant />} />
                <Route
                  path="edit-restaurant/:restaurantId"
                  element={<EditRestaurant />}
                />
                <Route path="add-item" element={<AddItem />} />
                <Route path="edit-item/:itemId" element={<EditItem />} />
                <Route path="orders/:restaurantId" element={<Orders />} />
              </Route>
            </Route>

            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search/results" element={<SearchResults />} />
            <Route path="/restaurant/:restaurantId" element={<Restaurant />} />
            <Route path="/item-details/:itemId" element={<ItemDetails />} />
            <Route path="/auth" element={<Auth />} />

            {/* Protected /cart route */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute user={user}>
                  <Cart />
                </ProtectedRoute>
              }
            />

            {/* Protected /checkout route */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute user={user}>
                  <Checkout />
                </ProtectedRoute>
              }
            />  
          </Routes>   
        </main>    

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
