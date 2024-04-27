import {useState} from 'react'
import { useAuthContext } from './useAuth'
import axios from 'axios'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (name: any, age: any, gender: any) => {
        setIsLoading(true)
        setError(null)

        try {        
            const response = await axios.post('http://localhost:8000/user/add', {name, age, gender})
            const data = await response.data
            console.log("auth context" + data)
            if (response.status !== 200) {
                setIsLoading(false)
                setError(data.message)
            }

            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(data))
                dispatch({type: 'LOGIN', payload: data})
                setIsLoading(false)
            }
        } catch (e) {
            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}