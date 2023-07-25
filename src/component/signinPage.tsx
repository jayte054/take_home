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
      <h2 className="mb-4">Sign In</h2>
      <form onSubmit={handleSubmit} className="form-group">
      <label htmlFor="exampleInputEmail1" className='text-white'>Email address</label>
        <input type="email" 
               placeholder="Email" 
               className="form-control"
               value={email} 
               onChange={(e) => setEmail(e.target.value)} 
               /><br />
        <label htmlFor="exampleInputEmail1" className='text-white'>Password</label>
        <input type="password" 
               placeholder="Password" 
               value={password} 
               className="form-control"
               onChange={(e) => setPassword(e.target.value)} 
               /><br /> <br />

        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
};

export default SigninPage;