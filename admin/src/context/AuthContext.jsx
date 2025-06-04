import { createContext, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user)
      const token = parsedUser?.accessToken;

      if(token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds

        if(decoded.exp < currentTime) {
          // Token expired
          localStorage.removeItem("user")
          dispatch({type:"LOGOUT"})
        } else {
           dispatch({ type: "LOGIN", payload: JSON.parse(user) });
        }
      }
    }
  }, []);

  useEffect(() => {
    console.log("Auth State: ", state);
  }, [state]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
