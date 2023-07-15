import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
import { UserContext } from "../UserContext";
export const LoginPage = () => {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  async function handleLogin(ev){
    ev.preventDefault();
    try {
      const response = await axios.post('/api/login', {email, password});
      const userData = response.data;
      setUser(userData);
      alert('Login success');
      setRedirect(true);
    } catch (error) {
      alert("Error")
    }
  }
  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="">
        <h1 className="text-2xl text-center font-bold mb-4">Login</h1>
        <form className="max-w-md mx-auto " onSubmit={handleLogin}>
          <input type="email" placeholder="Enter your email" value={email} onChange={ev=> setEmail(ev.target.value)}/>
          <input type="password" placeholder="Enter your password" value={password} onChange={ev => setPassword(ev.target.value)}/>
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">Don't have an account yet?  
          <Link to={'/register'} className="underline text-black">Register now</Link></div>
        </form>
      </div>
    </div>
  );
};
