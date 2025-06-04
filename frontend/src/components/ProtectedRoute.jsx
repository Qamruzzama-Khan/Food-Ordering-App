import { Navigate } from "react-router-dom";
import Spinner from "./Spinner"


const ProtectedRoute = ({user, children}) => {
 if(user === null) {
    return <Spinner />;
 }
 return user ? children : <Navigate to="/auth" />;
}

export default ProtectedRoute
