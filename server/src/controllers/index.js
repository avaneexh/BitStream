import {
    getOtp,
    verifyEmail,
    registerUser,
} from "./authController.js";


const AuthAPI = {
    getOtp:getOtp,
    verifyEmail:verifyEmail,
    registerUser:registerUser,
}

export {
    AuthAPI,
}