import { useNavigate } from "react-router-dom"

export const TakeHome =() => {

    const navigate = useNavigate()

    const handleClick = () => {
        // e.preventDefault()
        console.log("here")
        navigate("/auth")
    }

    return (
        <div>
            <h1>Take Home Solution</h1>
            <button type="button" onClick={handleClick}>Enter</button>
        </div>
    )
}