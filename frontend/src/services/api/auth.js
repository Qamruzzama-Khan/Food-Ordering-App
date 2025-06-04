import axios from "axios"
import { common_Url } from "../../utils/constants"

const api = axios.create({
    baseURL: `${common_Url}/auth`
});

// SignUp
export const signup = (data) => api.post("/sign-up", data);

// SignIn
export const signin = (data) => api.post("/sign-in", data);