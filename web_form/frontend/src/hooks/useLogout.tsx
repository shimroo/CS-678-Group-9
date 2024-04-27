import { useAuthContext } from "./useAuth"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        navigate('/')
    }
    return {logout}
}