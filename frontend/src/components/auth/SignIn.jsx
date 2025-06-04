import {useState} from "react"
import { useAuthContext } from "../../hooks/useAuth";
import { signin } from "../../services/api/auth";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
     const [form, setForm] = useState({
        email: "",
        password: "",
      });
       const [isSubmitting, setIsSubmitting] = useState(false);
      const [error, setError] = useState("");
      const [showPass, setShowPass] = useState(false);
      const { dispatch } = useAuthContext();
      const navigate = useNavigate();
    
      const TogglePass = () => {
          setShowPass(!showPass);
      };
    
       const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
          ...form,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setIsSubmitting(true);
          const response = await signin(form);
          dispatch({ type: "LOGIN", payload: response.data.data });
          localStorage.setItem("user", JSON.stringify(response.data.data));
          setIsSubmitting(false);
          setForm({ email: "", password: ""});
          navigate("/")
        } catch (error) {
          setError(error.response.data.message);
          setIsSubmitting(false);
        }
      };

  return (
     <form onSubmit={handleSubmit} className='flex flex-col items-center gap-2 p-2 w-full sm:w-[70%] md:w-[60%] lg:w-[40%] mx-auto'>
        {/* Email */}
        <input name="email" value={form.email}  onChange={handleChange} type="email" placeholder='Email' className="border border-gray-300 p-2 rounded w-full focus:outline-none" />
               {/* Password */}
              <div className="border border-gray-300 p-2 rounded w-full flex items-center justify-between">
                <input name="password" value={form.password} onChange={handleChange} type={showPass ? "text" : "password"} placeholder='Password' className="focus:outline-none w-full " />
                <button type="button" className="text-xl text-gray-500 hover:text-gray-600 cursor-pointer" onClick={TogglePass}> {showPass ? <MdVisibilityOff /> :  <MdVisibility /> }</button>
              </div>
              {/* Error */}
               {error && <div className="text-red-600  bg-gray-100 w-full p-2 rounded">{error}...!</div>}
               {/* Submit btn */} 
               <button type="submit" className='bg-orange-500 hover:bg-orange-600 cursor-pointer text-white p-2 rounded w-full'>
                    {isSubmitting ? "signin..." : "signin"}
               </button>
    </form>
  )
}

export default SignIn
