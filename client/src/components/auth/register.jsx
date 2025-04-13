import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Register() {
  const { state } = useLocation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email] = useState(state?.email || '');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name || !username) return;
    // 👇 Call RTK API for signup
    navigate('/'); // 🔁 Redirect to homepage/dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0f0f0f] px-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Register</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full p-3 mb-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 dark:text-white"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-3 mb-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 dark:text-white"
        />
        <input
          type="email"
          value={email}
          readOnly
          className="w-full p-3 mb-4 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-700 text-white cursor-not-allowed"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
