import {useState} from 'react'
import { useAuthContext } from './useAuth'
import axios from 'axios'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (username: any, password: any) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post('http://localhost:8000/user/login', {username, password})
            const data = await response.data

            if (response.status !== 200) {
                setError(data.message)
                setIsLoading(false)
            }

            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(data))
                dispatch({type: 'LOGIN', payload: data})
                setIsLoading(false)
            }
        } catch (error) {
            // setError("An error occurred. Please try again later.")
            setIsLoading(false)
        }
    }
    return { login, isLoading, error }
}