import { useFrappeAuth } from 'frappe-react-sdk';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useActions } from '../../../overmind';
import { useAppState } from '../../../overmind';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setError] = useState('');
  const { login } = useFrappeAuth();
  const navigate = useNavigate();
    const { setUserState } = useActions()
    const { user } = useAppState()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    login({ username, password }).then(() => {
      setUserState(username);
     navigate('/dashboard');
    }).catch((err) => {
      setError(err.message);
    }).finally(() => {
      setLoading(false);
    });
  };

  if(user?.loggedIn){
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <>{loading ? <p>Loading...</p> : <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
              Login
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
              >
              Forgot Password?
            </a>
            {loginError && <p className="text-red-500">{loginError}</p>}
          </div>
        </form>}</>
      </div>
    </div>
  );
};

export default Login;
