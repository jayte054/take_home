// src/pages/SignupPage.tsx

import axios from 'axios';
import React, { useState } from 'react';
import { Role, useAuth } from "../context/authContext";
import { BASE_URL } from '../services/authService';

export const SignupPage: React.FC = () => {
  const { handleSignup } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('user');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(email, password, role)
      const response = await handleSignup(email, password, role);
      console.log(response)
      console.log("success");
    // const response = await axios.post(`${BASE_URL}/auth/signup`,{email, password, role})
    // console.log(response.data)
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className=''>
      <div className='bg-danger'>
        <h2 className='mb-4'>Signup</h2>
        <form onSubmit={handleSubmit} className='form-group'>
          <label htmlFor="exampleInputEmail1" className='text-white'>Email address</label>
          <input
            type="email"
            placeholder="Email"
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <label htmlFor="exampleInputEmail1" className='text-white'>Password</label>
          <input
            type="password"
            placeholder="Password"
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <label htmlFor="exampleInputEmail1" className='text-white'>Select Role</label>
          <select className='form-control' value={role} onChange={(e) => setRole(e.target.value as Role)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select><br /><br />
          <button type="submit" className='btn btn-primary'>Signup</button>
      </form>
      </div>
    </div>
  );
};

