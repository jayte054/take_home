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
    <div>
      <h1>Authentication</h1>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <p>Email:</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Select Role</p>
        <select value={role} onChange={(e) => setRole(e.target.value as Role)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <p>click below to signup</p>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

