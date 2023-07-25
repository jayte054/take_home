import { useNavigate } from "react-router-dom"

export const TakeHome =() => {

    const navigate = useNavigate()

    const handleClick = () => {
        // e.preventDefault()
        console.log("here")
        navigate("/auth")
    }

    return (
        <div className="d-flex justify-content-center flex-column gap-5 align-items-center " style={{height : "100vh"}}>
            <h1 className="display-4">Take Home Solution</h1>
            <button type="button" className="btn btn-primary px-4" onClick={handleClick}>Enter</button>
        </div>
    )
}