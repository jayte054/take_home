import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const SignoutButton: React.FC = () => {
  const { user, handleSignout } = useAuth();
  const navigate = useNavigate()

  const signout = async () => {
    try {
      await handleSignout();
        navigate("/landing")
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle error if needed
    }
  };

  return (
    <button onClick={signout}>
      Sign Out
    </button>
  );
};

export default SignoutButton;
