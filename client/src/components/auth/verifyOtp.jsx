import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function OtpVerify() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    if (!otp) return;
    // 👇 Call your RTK API to verify OTP
    navigate('/register', { state: { email: state?.email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0f0f0f] px-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Enter OTP</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 dark:text-white mb-4"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}