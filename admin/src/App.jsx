import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import { useAuthContext } from "./hooks/useAuth"
import {Navigate} from "react-router-dom"
import AddItem from "./pages/AddItem"
import UpdateItem from "./pages/UpdateItem"

function App() {
  const {user} = useAuthContext();

  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={user && user?.user.status === "admin" ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
