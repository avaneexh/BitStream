import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/auth/login'; 
import EmailVerify from '../components/auth/verifyEmail'; 
import OtpVerify from '../components/auth/verifyOtp'; 
import Register from '../components/auth/register'; 

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/verify-email" element={<EmailVerify />} />
      <Route path="/verify-otp" element={<OtpVerify />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
);

export default AppRoutes;