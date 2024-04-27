import React from 'react'
import { createContext, useReducer } from "react";


type AuthContextType = {
    user: null | any; 
    dispatch: React.Dispatch<any>;
};
  
export const AuthContext = createContext<AuthContextType>({
    user: null,
    dispatch: () => {} 
});

export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state 
    }
}

export const AuthContextProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    console.log("AuthContext State: ", state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}