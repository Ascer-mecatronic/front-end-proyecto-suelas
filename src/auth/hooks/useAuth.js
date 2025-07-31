import React, { useReducer, useState } from 'react'
import { loginReducer } from '../reducers/loginReducer';
import { loginUser } from '../services/authService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {  
    isAuth: false,      
    isAdmin:false,
    user: undefined,    
}

const initialMessageErrors = '';

export const useAuth = () => {

  

    const [login, dispatch] = useReducer(loginReducer, initialLogin);

    const [errors, setErrors] = useState(initialMessageErrors)

    const navigate = useNavigate();

    const handlerLogin = async ({username,password}) => {

      if(sessionStorage.getItem('cart') != null){
    sessionStorage.removeItem('cart');
  }

      try {
        const response =  await loginUser({username,password});
        const token = response.data.token;
        const claims = JSON.parse(window.atob(token.split(".")[1]));
        console.log(claims);
        const user = {username: claims.username}
        dispatch({
          type: 'login',
          payload: {user, isAdmin:claims.isAdmin},
        });
        sessionStorage.setItem('login', JSON.stringify({
          isAuth: true,
          isAdmin:claims.isAdmin,
          user,
        }));
        sessionStorage.setItem('token', `Bearer ${token}`);
        Swal.fire("Sesion iniciada con exito, bienvenido!");
        setErrors('');
        navigate('/products')
      } catch (error) {
        if(error.response?.status == 401){
          console.log(error);
          setErrors('Username o password incorrectos');
          Swal.fire('Error Login','Username o password incorrectos', 'error');
        }else if(error.response?.status == 403){
          console.log(error);
          setErrors('No tiene acceso al recurso o permisos!');
           Swal.fire('Error Login','No tiene acceso al recurso o permisos!', 'error');
        }else{
          throw error;
        }
      }

    }

    const handlerLogout = () => {
      Swal.fire({
  title: "Deseas cerrar sesion?",
  text: "Confirma si deseas finalizar sesion",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    dispatch({
          type: 'logout'
        });
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('token');
        sessionStorage.clear();
        
    Swal.fire({
      title: "Sesion finalizada!",
      text: "Hasta la proxima!.",
      icon: "success"
    });
  }
});
      
    }

    const clearSessionExpired = () =>{
      dispatch({
          type: 'logout'
        });
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('token');
        sessionStorage.clear();
    }

  return {
    login,
    errors,
    handlerLogin,
    handlerLogout,
    clearSessionExpired,
  }
}
