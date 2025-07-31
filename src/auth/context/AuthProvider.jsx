
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({children}) => {

    const {login, errors, handlerLogin, handlerLogout, clearSessionExpired} = useAuth();

  return (
  <AuthContext.Provider value={ 
        {
            login,
            errors,
            handlerLogin,
            handlerLogout,
            clearSessionExpired,
        }
    }>
        {children} 
    </AuthContext.Provider>
  )
}
