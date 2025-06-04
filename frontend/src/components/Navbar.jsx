import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useAuthContext } from "../hooks/useAuth";
import { useCartContext } from "../hooks/useCart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();
  const { cart } = useCartContext();

  return (
    <header className="flex items-center justify-between p-5 shadow-md relative md:px-10">
      <h1 className="text-[24px] md:text-[28px] font-bold text-orange-400">FoodExpress</h1>

      {/* Desktop Nav */}
      <nav>
        <ul className="hidden md:flex items-center gap-4 text-xl text-gray-600">
          <li className="hover:underline ">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:underline ">
            <Link to="/about">About</Link>
          </li>
          {user && (
            <>       
              <li      className="hover:underline ">
                <Link to="/cart" className="flex items-center gap-1">
                  <span>Cart</span>
                  {cart?.items?.length > 0 && (
                    <span className="bg-orange-500 text-white w-5 h-5 text-sm flex items-center justify-center rounded-full font-semibold">
                      {cart.items.length}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <FaUser className="text-4xl text-orange-400 border  p-1 rounded-full bg-gray-100 hover:text-orange-500" />
                </Link>
              </li>  
            </>         
          )}
          {!user && (
            <li className="hover:underline ">
              <Link to="/auth">SignIn</Link>
            </li>
          )}
        </ul>

        {/* Hamburger Icon for Mobile */}
        <FaBars
          className="text-xl md:hidden cursor-pointer text-gray-600 hover:text-gray-700"
          onClick={() => setIsOpen(true)}
        />
      </nav>

      {/* Side Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-400/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div className="bg-white w-64 h-full p-5 absolute left-0 top-0 z-50 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[24px] font-bold text-orange-400">FoodExpress</h2>
              <IoMdClose
                className="text-2xl cursor-pointer text-gray-600 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <ul className="flex flex-col text-gray-600 gap-2 text-lg">
              <li className="hover:bg-gray-100 px-2 py-1 rounded">
                <Link to="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              </li>
              {user && (
                <>
                  <li className="hover:bg-gray-100 px-2 py-1 rounded">
                    <Link to="/cart" onClick={() => setIsOpen(false)}>
                      Cart
                    </Link>
                  </li>
                  {user?.user?.isRestaurantOwned && (
                    <li className="hover:bg-gray-100 px-2 py-1 rounded">
                      <Link
                        to="/my-restaurant"
                        onClick={() => setIsOpen(false)}
                      >
                        My Restaurant
                      </Link>
                    </li>
                  )}
                  <li className=" px-2 py-1">
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <FaUser className="text-4xl text-orange-400 border  p-1 rounded-full bg-gray-100 hover:text-orange-500" />
                    </Link>
                  </li>
                </>
              )}
              {!user && (
                <li className="hover:bg-gray-100 px-2 py-1 rounded">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    SignIn
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
