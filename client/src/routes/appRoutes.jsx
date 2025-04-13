import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/forms/Login';
import EmailVerify from '../components/forms/EmailVerify';
import OtpVerify from '../components/forms/OtpVerify';
import Register from '../components/forms/Register';

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