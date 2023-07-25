import axios from "axios";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


 const firebaseConfig = {
    apiKey: "AIzaSyBx-hmNZ84vtJihVKVgT1rg8rjufyAz000",
    authDomain: "assignment-846dd.firebaseapp.com",
    databaseURL: "https://assignment-846dd-default-rtdb.firebaseio.com",
    projectId: "assignment-846dd",
    storageBucket: "assignment-846dd.appspot.com",
    messagingSenderId: "841670285753",
    appId: "1:841670285753:web:e901c245ca2069cc077e68",
    measurementId: "G-KE426XTVLG"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app)




export type Role = "user" | "admin"
export const BASE_URL = process.env.REACT_APP_BASE_URL || "https://justin-m3dr.onrender.com";

export interface SignupData {
    email: string;
    password: string;
    role: Role;
}

export interface SignInData {
    email: string;
    password: string;
  }

export const signupService = async (email:string, password: string, role: Role): Promise<string> => {
    console.log(email, password, role)
    try{
        const response = await axios.post(`https://justin-m3dr.onrender.com/auth/signup`, {email, password, role})
        console.log(response.data)
        return response.data.user.uid
    }catch(error){
        console.log(error + "signupfailer")
        throw new Error("signup failed, check the data provided")
    }
    
}


export const auth = getAuth();


export const signinService = async (email: string, password: string): Promise<string> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user?.uid;

    if (!uid) {
      throw new Error("Failed to sign in");
    }

    return uid;
  } catch (error) {
    console.log(error);
    throw new Error("Signin failed. Please check the provided data.");
  }
};



  
  
  
  
  
  
  