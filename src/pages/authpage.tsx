import { NavbarAuth } from "../component/navbarAuth"
import { SigninPage } from "../component/signinPage"
import { SignupPage } from "../component/signupPage"
import "./authPage.css"


export const AuthPage = () => {
    return(
        <div>
            <NavbarAuth />
             <div className="d-flex flex-row justify-content-around bg-danger align-items-center" style={{height:"85vh"}}>
                <SignupPage />
                <SigninPage />
            </div>
        </div>
       
    )
}