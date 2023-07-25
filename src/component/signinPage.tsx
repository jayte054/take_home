import React, {  useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const SigninPage: React.FC = () => {
  const { handleSignin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await handleSignin(email, password);
      console.log("Signin success");
      navigate("/datapage")
      return response
      
      
    } catch (error: any) {
      console.log("Signin error:", error.message);
    }
  };

  return (
    <div >
      
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <p>Email</p>
        <input type="email" 
               placeholder="Email" 
               value={email} 
               onChange={(e) => setEmail(e.target.value)} 
               /><br />
        <p>Password</p>
        <input type="password" 
               placeholder="Password" 
               value={password} 
               onChange={(e) => setPassword(e.target.value)} 
               /><br />
        <p>Click to signin</p> 
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SigninPage;