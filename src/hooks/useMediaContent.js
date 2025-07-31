import React, { useContext, useReducer, useState } from 'react'
import { mediaContentReducer } from '../reducers/mediaContentReducer';
import { findAllPages, garbageCollectionOne, garbageCollectionTwo, removePage, savePage, updatePage } from '../services/mediaService';
import { AuthContext } from '../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const initialMediaContent = [];

const initialPageForm = {
    id: 0,
    name: '',
    imageOne: '',
    imageTwo: '',
    imageThree: '',
    textOne: '',
    textTwo: '',
    collectionOne: [
        {
            id: 0,
            uri: '',
        }
    ],
    collectionTwo: [
        {
            id: 0,
            uri: '',
        }
    ],
}

const initialErrorsPage = {
    id: '',
    name: '',
    imageOne: '',
    imageTwo: '',
    imageThree: '',
    textOne: '',
    textTwo: '',
    filesOne: '',
    filesTwo: '',
}

export const useMediaContent = () => {

    const [pages, dispatch] = useReducer(mediaContentReducer, initialMediaContent);

    const [errorsPage, setErrorsPage] = useState(initialErrorsPage);

    const [pageSelected, setPageSelected] = useState(initialPageForm);

    const { login, clearSessionExpired } = useContext(AuthContext);

    const navigate = useNavigate();

    const getPages = async () => {
        //if (!login.isAdmin) return;
        const result = await findAllPages();
        dispatch({
            type: 'loadPagesContent',
            payload: result.data,
        });
    }

    const handlerAddPages = async (page, id) => {
        if (!login.isAdmin) return;
        let response;
        console.log(id);
        try {
            if (id === 0) {
                response = await savePage(page);
            } else {
                response = await updatePage(page);
            }

            dispatch({
                type: (page.id === 0) ? 'addPage' : 'updatePage',
                payload: response.data,
            });

            Swal.fire(
                (id === 0) ?
                    'Pagina Creada' :
                    'Pagina Actualizada',
                (id === 0) ?
                    'La pagina ha sido creado con exito!' :
                    'El contenido ha sido actualizado con exito!',
                'success'
            );
            navigate('/pages');

        } catch (error) {
            if (error.response && error.response.status == 400) {
                setErrorsPage(error.response.data);
            } else if (error.response && error.response.status == 500 &&
                error.response.data?.message?.includes('constraint')) {

                if (error.response.data?.message?.includes('UK_name')) {
                    setErrorsPage({ username: 'El username ya existe!' })
                }
            } else if (error.response?.status == 401) {
                setErrorsPage(initialErrorsPage);
                clearSessionExpired();
                Swal.fire("El tiempo de sesion a finalizado");
            } else {
                throw error;
            }
        }
    }

    const handleRemovePage = async (id) => {

        if (!login.isAdmin) return;

        Swal.fire({
            title: "Esta seguro que desea eliminar?",
            text: "Esta pagina se eliminara !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await removePage(id);
                    dispatch({
                        type: 'removePage',
                        payload: id,
                    });
                    Swal.fire({
                        title: "Eliminado!",
                        text: "El producto a sido eliminado exitosamente.",
                        icon: "success"
                    });
                    navigate('/pages');
                } catch (error) {
                    if (error.response?.status == 401) {
                        clearSessionExpired();
                        Swal.fire("El tiempo de sesion a finalizado");
                    } else if (error.response?.status == 404) {
                        console.log("elemento eliminado exitosamente");
                        //navigate('/products');
                    } else {
                        throw error;
                    }
                }
            }
        });
    }

    const handlerPageSelected = (page) => {
        setPageSelected({ ...page });
    }

    const garbageCollOne = async () => {
            if (!login.isAdmin) return;
            try {
                const response = await garbageCollectionOne();
                if (response?.status == 200) {
                    console.log('archivos sobrantes han sido eliminados exitosamente: ' + response.data.message )
                }
            } catch (error) {
                if (error.response?.status == 401 || error.response?.status == 403) {
                    console.log('sin acceso a recurso o tiempo de sesion finalizado');
                    clearSessionExpired();
                } else if (error.response && error.response.data.status == 500) {
                    console.log(err.response.data.message);
                } else {
                    console.log(error);
                    throw error;
                }
            }
        }

    const garbageCollTwo = async () => {
            if (!login.isAdmin) return;
            try {
                const response = await garbageCollectionTwo();
                if (response?.status == 200) {
                    console.log('archivos sobrantes han sido eliminados exitosamente: ' + response.data.message )
                }
            } catch (error) {
                if (error.response?.status == 401 || error.response?.status == 403) {
                    console.log('sin acceso a recurso o tiempo de sesion finalizado');
                    clearSessionExpired();
                } else if (error.response && error.response.data.status == 500) {
                    console.log(err.response.data.message);
                } else {
                    console.log(error);
                    throw error;
                }
            }
        }

        const handleCloseFrm = () =>{
            setPageSelected(initialPageForm);
            setErrorsPage(initialErrorsPage)
            navigate('/pages');
        }

    return {
        pages,
        pageSelected,
        initialPageForm,
        errorsPage,
        getPages,
        handlerAddPages,
        handleRemovePage,
        handlerPageSelected,
        handleCloseFrm,
    }
}
