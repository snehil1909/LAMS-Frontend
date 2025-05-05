import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const handleLogin = async (event) => {
  event.preventDefault();
  setError('');
  try {
    // Replace with your actual API endpoint
    const res = await axios.get(`http://192.168.47.133:5000/api/id/get-userid/${email}/`);
    const userId = res.data.userId;
    const supervisorId = res.data.supervisorId;
    if (!userId) {
      setError('User not found.');
      return;
    }


    // Determine role based on userId
    let role = '';
    console.log(userId);
    if (userId >= 1 && userId <= 34) role = 'SUPERVISOR';
    else if (userId >= 1000 && userId <= 1999) role = 'EMPLOYEE';
    else if (userId >= 2000 && userId <= 2999) role = 'HR';
    else if (userId === 3000) role = 'ADMIN';
    else role = 'UNKNOWN';
    console.log(role);
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify({ userId, supervisorId, email, role}));
 
    // Redirect based on role
    if (role === 'SUPERVISOR') navigate(`/profile/${userId}`);
    else if (role === 'EMPLOYEE') navigate(`/profile/${userId}`);
    else if (role === 'HR') navigate(`/profile/${userId}`);
    else if (role === 'ADMIN') navigate('/employees');
    else setError('Unauthorized user.');
  } catch (err) {
    setError('Invalid login or user not found.');
  }
};

  return (
    <div id="login" className="w-64 h-80 bg-indigo-50 rounded shadow flex flex-col justify-between p-3">
      <form className="text-indigo-500" onSubmit={handleLogin}>
        <fieldset className="border-4 border-dotted border-indigo-500 p-5">
          <legend className="px-2 italic -mx-2">Welcome again!</legend>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <label className="text-xs font-bold after:content-['*'] after:text-red-400" htmlFor="email">Mail</label>
          <input
            className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="text-xs font-bold after:content-['*'] after:text-red-400" htmlFor="password">Password</label>
          <input
            className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="#" className="">Forgot Password?</a>
          <button className="w-full rounded bg-indigo-500 text-indigo-50 p-2 text-center font-bold hover:bg-indigo-400">
            Log In
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;