import React, { useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext';
import { Link, NavLink } from 'react-router-dom';

export const NavBarMenu = () => {

    const { login, handlerLogout } = useContext(AuthContext);

    return (
        <>

            <header className='fixed-top'>
                <div className='container-fluid'>
                    <div className='row justify-content-between align-items-center'>
                        <div className='col-2'>
                            <NavLink to={'/products'}><h3 className="">SuelasApp 4.3</h3></NavLink>
                        </div>
                        <div className='col-8 text-center  menu'>

                            <a href='/init' className='active'><p>Inicio</p></a>
                            <a href='/products'><p>Catalogo</p></a>
                            <a href='/products/cartPage'><p>Carrito</p></a>


                            {login.isAdmin ? <>
                                <a href='#'
                                    className='btn btn-dark dropdown-toggle'
                                    type='button'
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'
                                    id='dropdown-menu'
                                >
                                    Edicion
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdown-menu">
                                    <li><Link className="nav-link" to={'/products/register'}>Agregar productos</Link></li>
                                    <li><Link className="nav-link" to={'products/edit/attributes'}>Editar/agregar campos </Link></li>
                                    <li><Link className="nav-link" to={'/users'}> Administrar usuarios </Link></li>
                                    <li><Link className="nav-link" to={'/pages'}> Administrar paginas </Link></li>
                                </ul>
                            </> : ''}

                        </div>
                        <div className='col-2'>
                            <div className="" id="">
                                {(login.isAdmin || login.isAuth) ? <h5 className="text-primary mx-4">{login?.user.username}</h5>
                                    : <button
                                        className="btn btn-outline-success">
                                        <Link className="nav-link" to={'/login'}> login </Link>
                                    </button>}
                                {!login.isAuth ||
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={handlerLogout}>
                                        Logout
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
