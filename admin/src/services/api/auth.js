import axios from "axios"
import { common_Url } from "../../utils/constants";

const api = axios.create({
    baseURL: `${common_Url}/auth`
});

// SignIn
export const signin = (data) => api.post("/sign-in", data);