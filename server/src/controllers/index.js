import {
    getOtp,
    verifyEmail,
    registerUser,
    loginUser,
} from "./authController.js";


const AuthAPI = {
    getOtp:getOtp,
    verifyEmail:verifyEmail,
    registerUser:registerUser,
    loginUser:loginUser,
}

export {
    AuthAPI,
}