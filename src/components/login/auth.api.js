import { getMethod, postMethod } from "../../api/methods";
import API_ROUTES from "../../api/routes";
const { LOGIN, SINGUP, ALL_USERS, OTP_VALIDATION} = API_ROUTES;

const getLogin = async (payload) => {
    const response = await postMethod(LOGIN, payload);
    return response?.data;
};

const getOtpValidation = async (payload) => {
    const response = await postMethod(OTP_VALIDATION, payload);
    return response?.data;
};

const getSignup = async (payload) => {
    const response = await postMethod(SINGUP, payload)
    return response?.data;
};

const getUsers = async () => {
    const response = await getMethod(ALL_USERS);
    return response?.data;
}

export { getLogin, getSignup, getUsers, getOtpValidation
    
 }