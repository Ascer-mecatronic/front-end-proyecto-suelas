import React, { useContext, useEffect } from 'react'
import { MediaContext } from '../context/MediaContext'
import { AuthContext } from '../auth/context/AuthContext';
import { PageList } from '../components/PageList';
import { useNavigate } from 'react-router-dom';

export const AdminPage = () => {

    const { pages, getPages } = useContext(MediaContext);

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        getPages();
    }, []);

    const createPage = () =>{
       navigate('/pages/register');
    }

    return (
        <div className='container my-4'>
            <h2>Administrador de Contenido Multimedia publico</h2>
            <div className='row'>
                <div className='col'>
                    {!login.isAdmin || <button
                        onClick={()=>createPage()}
                        className="btn btn-primary my-2">
                        Nueva Pagina
                    </button>}
                    {
                        pages.length === 0 ? <div className="alert alert-warning">No hay contenido en el sistema!</div>
                            : <PageList/>
                    }
                </div>
            </div>
        </div>
    )
}
