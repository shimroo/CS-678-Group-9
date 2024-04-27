import { AuthContext } from "../context/authContext"
import { useContext } from "react"

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context)
    {
        throw Error("useAuthContext Must Be Inside an AuthContextProvider")
    }

    return context
}