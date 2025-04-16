import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendOtpMutation } from '../../services/authAPI'; 


export default function EmailVerify() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [sendOtp, { isLoading, error }] = useSendOtpMutation();

  const handleGetOtp = async () => {
    if (!email) return;
  
    try {
      await sendOtp({ email, purpose: "signup" }).unwrap();
      console.log("OTP sent!");
  
      navigate('/verify-otp', { state: { email, purpose: "signup" } });
    } catch (err) {
      console.error("Failed to send OTP:", err);
      // Optionally show error to user
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0f0f0f] px-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Verify Email</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 dark:text-white mb-4"
        />
        <button
          onClick={handleGetOtp}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
        >
          Get OTP
        </button>
      </div>
    </div>
  );
}
