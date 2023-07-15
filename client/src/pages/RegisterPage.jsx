import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
export const RegisterPage = () => {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassWord] = useState('');
    async function handleRegister(ev){
        ev.preventDefault();
        try {
            await axios.post('/api/register', {name, email, password});
            alert('Success');  
        } catch (error) {
            alert('error');
        }
    }
  return (
    <div className="mt-4 grow flex items-center justify-around">
    <div className="">
      <h1 className="text-2xl text-center font-bold mb-4">Sign Up</h1>
      <form className="max-w-md mx-auto " onSubmit={handleRegister}>
        <input type='text' placeholder='Enter your name' value={name} onChange={ev=> setName(ev.target.value)}/>
        <input type="email" placeholder="Enter your email" value={email} onChange={ev=> setEmail(ev.target.value)}/>
        <input type="password" placeholder="Enter your password" value={password} onChange={ev=> setPassWord(ev.target.value)}/>
        <button className="primary">Sign Up</button>
        <div className="text-center py-2 text-gray-500">Already have an account ? 
        <Link to={'/login'} className="underline text-black">Sign In</Link></div>
      </form>
    </div>
  </div>
  )
}
