import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const initialRegisterForm = {
    name: '',
    lastname: '',
    username: '',
    password: '',
}

export const AcountRegisterPage = () => {

    const {handlerRegister, errors} = useContext(UserContext);

    const [registerForm, setRegisterForm] = useState(initialRegisterForm);

    const { name, lastname, username, password } = registerForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setRegisterForm({
            ...registerForm,
            [name]: value,
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
       /* if (!name || !lastname || !username || !password) {
            Swal.fire('Error de validacion', 'Username y password requeridos', 'error');
        }*/
        //aca implementamos el login
        handlerRegister({ name, lastname, username, password });

        setRegisterForm(initialRegisterForm);
    }

    return (
        <div className="row justify-content-center">
            <div className="principal col-8 justify-content-center ">
                <div className="title-div">
                    <h5 className="title">Crear Cuenta</h5>
                </div>
                <form onSubmit={(event) => onSubmit(event)}>
                    <div className="body">
                        <input
                            className="form-control my-3 w-75"
                            placeholder="Nombre"
                            type="text"
                            value={name}
                            name="name"
                            onChange={(event) => onInputChange(event)} />
                            <p className="text-danger">{ errors?.name}</p>

                        <input
                            className="form-control my-3 w-75"
                            placeholder="Apellido"
                            type="text"
                            value={lastname}
                            name="lastname"
                            onChange={(event) => onInputChange(event)} />
                            <p className="text-danger">{ errors?.lastname}</p>

                        <input
                            className="form-control my-3 w-75"
                            placeholder="Correo electronico"
                            type="email"
                            value={username}
                            name="username"
                            onChange={(event) => onInputChange(event)} />
                            <p className="text-danger">{ errors?.username}</p>

                        <input
                            className="form-control my-3 w-75"
                            placeholder="Contraseña"
                            type="password"
                            value={password}
                            name="password"
                            onChange={(event) => onInputChange(event)} />
                            <p className="text-danger">{ errors?.password}</p>


                    </div>
                    <div className="footer">
                        <button
                            type="submit"
                            className="btn btn-primary">
                            Crear
                        </button>
                        <NavLink className={"btn btn-secondary btn-sm"} to={'/login'}>
                            Ingresar
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}
