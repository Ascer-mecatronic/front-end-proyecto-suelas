import { Link, NavLink } from "react-router-dom"
import { AuthContext } from "../../auth/context/AuthContext";
import { useContext } from "react";


export const NavBar = () => {
    
    const {login,handlerLogout} = useContext(AuthContext);

    return (
        <>
        <header className="">
        <nav className="navbar navbar-expand-lg navbar-white m-3 p-3 ">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><h3 className="nav-titulo">SuelasApp 4.3</h3></a>

                <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                    aria-controls="menu"
                    aria-expanded="false"
                    aria-label="Mostrar / Ocultar menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse " id="menu">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item m-2 py-2"> <Link className="nav-link" to={'/init'}> Inicio </Link></li>
                        <li className="nav-item m-2 py-2"> <Link className="nav-link" to={'/products'}> Catalogo </Link></li>
                        {login.isAdmin ?
                        <li className="nav-item dropdown m-2 py-2">
                            <a href="#"
                                className="nav-link dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                id="dropdown-menu"
                            >Edicion</a>
                            <ul className="dropdown-menu" aria-labelledby="dropdown-menu">
                                <li><Link className="nav-link" to={'/products/register'}>Agregar productos</Link></li>
                                <li><Link className="nav-link" to={'products/edit/attributes'}>Editar/agregar campos </Link></li>   
                                <li><Link className="nav-link" to={'/users'}> Administrar usuarios </Link></li>
                                <li><Link className="nav-link" to={'/pages'}> Administrar paginas </Link></li>
                            </ul>
                        </li> : ""}
                    
                        <li className="nav-item m-2 py-2"><Link className="nav-link" to={'products/cartPage'}>Carrito de compras</Link></li>
                    </ul>
                </div>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNavLogout">
                    {(login.isAdmin || login.isAuth) ? <p className="text-success mx-4 my-2">{login?.user.username}</p>
                    :<button
                        className="btn btn-outline-success" style={{border: 'none'}}>
                        <Link className="nav-link text-success" to={'/login'}> login </Link>
                    </button>}
                    {!login.isAuth || 
                    <button
                        className="btn btn-outline-danger btn-logout"
                        onClick={handlerLogout}>
                        Logout
                    </button>
                    }
                </div>
            </div>
        </nav>
        </header>
        </>
    )
}
