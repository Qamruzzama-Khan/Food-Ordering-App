import {Link} from "react-router-dom"
import { useAuthContext } from "../hooks/useAuth"
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const Navbar = () => {
    const {user, dispatch} = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  return (
    <header className="flex items-center justify-between p-4 shadow-md relative bg-white z-50">
      <h1 className="text-xl md:text-2xl font-bold text-orange-500">FoodExpress</h1>

      {/* Desktop Navigation */}
      <nav>
        <ul className="hidden md:flex items-center gap-4 text-lg text-gray-600">
          {user && (
            <>
              <li className="hover:underline">
                <Link to="/">Home</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="bg-orange-500 text-white py-1 px-3 rounded-full cursor-pointer hover:bg-orange-600">Logout</button>
              </li>
            </>
          )}
          {!user && (
            <li className="hover:underline">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>

        {/* Hamburger Icon */}
        <FaBars
          className="text-xl md:hidden cursor-pointer text-gray-600 hover:text-gray-700"
          onClick={() => setIsOpen(true)}
        />
      </nav>

      {/* Side Drawer for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-400/30 z-40"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white w-64 h-full p-5 absolute left-0 top-0 z-50 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-orange-500">FoodExpress</h2>
              <IoMdClose
                className="text-2xl cursor-pointer text-gray-600 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <ul className="flex flex-col text-gray-600 gap-3 text-lg">
              {user && (
                <>
                  <li className="hover:bg-gray-100 px-2 py-1 rounded">
                    <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                  </li>
                  <li className="px-2 py-1">
                    <button className="bg-orange-500 text-white py-1 px-3 rounded-full cursor-pointer hover:bg-orange-600" onClick={() => { handleLogout(); setIsOpen(false); }}>
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!user && (
                <li className="hover:bg-gray-100 px-2 py-1 rounded">
                  <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
