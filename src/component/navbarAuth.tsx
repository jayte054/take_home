import { Link } from "react-router-dom"
import SignoutButton from "./signout"

export const NavbarAuth = () => {

    return(
        <div className="nav" 
             style = {{ fontWeight: "bold",
                        backgroundColor: "blue",
                        padding: "1rem",
                        margin: "1rem",
                        borderRadius: "1rem",
                        display: "flex",
                        justifyContent: "space-between"
                        }}>
            <h1>Take Home</h1>
            <span style={{marginTop: "1rem"}}>
            <Link to = "/adminsignin">Admin Signin</Link>
            </span>
            <SignoutButton />
        </div>
    )
}