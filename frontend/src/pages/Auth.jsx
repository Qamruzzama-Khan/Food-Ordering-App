import { useState } from "react"
import SignUp from "../components/auth/SignUp";
import SignIn from "../components/auth/SignIn";


const Auth = () => {
    const [authComp, setAuthComp] = useState("signin");

  return (
    <div className="p-2 md:p-5 mt-5 flex flex-col items-center">
      <h2 className="text-lg text-gray-600">{authComp}</h2>
      {authComp === "signup" && <SignUp />}
      {authComp === "signin" && <SignIn />}
       <div className="flex items-center gap-1 ">
          {authComp === "signin" ? (
            <span>If you don't have an account ?</span>
          ) : (
            <span>If you have an account ?</span>
          )}

          <button
            className="font-semibold text-orange-500 cursor-pointer hover:text-orange-600"
            onClick={() =>
              setAuthComp(authComp === "signin" ? "signup" : "signin")
            }
          >
            {authComp === "signin" ? "signup" : "signin"}
          </button>
        </div>
    </div>
  )
}

export default Auth
