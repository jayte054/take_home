import { Navbar } from "../component/navbar"
import AdminSigninPage from "../component/adminSigninPage"
import "./adminsigninpage.css"
export const AdminSignin = () => {

    return (
        <div >
            <Navbar />
            <div className= "adminsign">
            <AdminSigninPage />
            </div>
        </div>
    )
}