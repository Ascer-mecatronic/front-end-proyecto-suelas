import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";



const initialLoginForm = {
    username: '',
    password: '',
}

export const LoginPage = () => {

    const { handlerLogin, errors } = useContext(AuthContext);

    const [loginForm, setLoginForm] = useState(initialLoginForm);

    const { username, password } = loginForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLoginForm({
            ...loginForm,
            [name]: value,
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!username || !password) {
            Swal.fire('Error de validacion', 'Username y password requeridos', 'error');
        }
        //aca implementamos el login
        handlerLogin({ username, password });

        setLoginForm(initialLoginForm);
    }

    return (

        <div className="row justify-content-center">
            <div className="principal col-8 justify-content-center ">
                <div className="title-div">
                    <h5 className="title">Ingresar</h5>
                </div>
                <form onSubmit={(event) => onSubmit(event)}>
                    <div className="body">
                        <input
                            className="form-control my-3 w-75"
                            placeholder="Username"
                            type="text"
                            value={username}
                            name="username"
                            onChange={(event) => onInputChange(event)} />

                        <input
                            className="form-control my-3 w-75"
                            placeholder="Password"
                            type="password"
                            value={password}
                            name="password"
                            onChange={(event) => onInputChange(event)} />
                        <p className="text-danger">{errors ? errors : ''}</p>
                    </div>

                    <div className="footer">
                        <button
                            type="submit"
                            className="btn btn-primary">
                            Registrarse
                        </button>
                        <NavLink className={"btn btn-secondary btn-sm"} to={'/account/register'}>
                            Crear Cuenta
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>

    );
}
