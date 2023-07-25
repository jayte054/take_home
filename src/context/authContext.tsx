// import { createContext, useContext, useState } from "react"
// import { SignupData, signupService } from "../services/authService";

// export type Role = "user" | "admin"

// interface User {
//     email: string;
//     uid: string;
//     role: Role;
// }

// interface AuthContextProps {
//     children: React.ReactNode
// }

// interface AuthContextValue {
//     user: User | null;
//     handleSignup: (email: string, password: string, role: Role) => Promise<void> 
// }

// const AuthContext = createContext<AuthContextValue | undefined>(undefined)

// export const AuthProvider: React.FC<AuthContextProps> = ({children} )=> {
//     const [user, setUser] = useState< User | null>({uid: "", email: "", role: "admin" || "user"})

//     const handleSignup = async(data: SignupData) => {
//         try{
//             // const data: SignupData = {email, password, role}
//            const userData =  await signupService(data)
//            const newUser: User = {
//                uid: userData,
//                email: data.email,
//                role: data.role,
               
//            }
//            setUser(newUser)
//         }catch(error){
//             console.log("failed")
//             setUser({uid: "", email: "", role: "admin" || "user"})
//         }
//     }

//     const value: AuthContextValue = {user, handleSignup}
//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//       throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
//   };
  
// interface UserContextProps {
//     children: React.ReactNode
// }

// export type Role = "user" | "admin"

// interface User {
//         email: string;
//         uid: string;
//         role: Role;
//     }

//     interface AuthContextValue {
//             user: User | null;
//             // handleSignup: (email: string, password: string, role: Role) => Promise<void> 
//         }

// export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

// export const AuthProvider: React.FC<UserContextProps> = ({children}: UserContextProps) => {
//     const [user, SetUser] = useState<User>({email: "", uid: "", role: "user" || "role"})
//     const [isUserLoggedIn, setisUserLoggedIn] = useState(false)

//     const updateUser: any = (userData: any) => {
//         SetUser(userData)
//         console.log(userData)
//     }

//     // const contextValue = useMemo(() => ({user, updateUser}), [user])

//     return (
//         <AuthContext.Provider value={{user, updateUser}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }
  
import { createContext, useContext, useState } from "react";
import { auth, signinService, SignupData, signupService } from "../services/authService";

export type Role = "user" | "admin";

interface User {
  email: string;
  uid: string;
  role: Role;
}

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  user: User | null;
  handleSignup: (email: string, password: string, role: Role) => Promise<void>;
  handleSignin: (email: string, password: string) => Promise<void>;
  handleSignout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>({ uid: "", email: "", role: "admin" || "user" });

  const handleSignup = async (email: string, password: string, role: Role) => {
    try {
      const userData = await signupService(email, password, role);
      const newUser: User = {
        uid: userData,
        email,
        role
      };
      setUser(newUser);
    } catch (error) {
      console.log("failed");
      setUser({ uid: "", email: "", role: "admin" });
    }
  };

  const handleSignin = async (email: string, password: string) => {
    try {
      const uid = await signinService(email, password);
      setUser({ email, uid, role: "user" }); // You can set the role based on your requirements
    } catch (error) {
      console.log("Signin failed.");
      setUser(null);
    }
  };

  const handleSignout = async () => {
    try{
        await auth.signOut()
        setUser(null)
    }catch(error){
        throw new Error("Error Signing out")
    }
  }
  
  

  const value: AuthContextValue = { user, handleSignup, handleSignin, handleSignout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

  
  
  
  
  
  