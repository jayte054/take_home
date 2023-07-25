import { NavbarAuth } from "../component/navbarAuth"
import { SigninPage } from "../component/signinPage"
import { SignupPage } from "../component/signupPage"
import "./authPage.css"


export const AuthPage = () => {

    
    return(
        <div>
            <NavbarAuth />
             <div className="auth">
            <SignupPage />
            <SigninPage />
        </div>
        </div>
       
    )
}