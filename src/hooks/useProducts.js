import { useContext, useEffect, useState } from "react";
import { useReducer } from "react";
import { findAll, findByDetails, findListsForm, findRebajas, optimizeGarbageFiles, remove, save, update } from "../services/productService";
import { productsReducer } from "../reducers/productsReducer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../auth/context/AuthContext";


const initialProducts = [];

const initialProductsForm = {
    id: 0,
    name: '',
    precio: '',
    cantidad: [
        {
            id: 0,
            name: '',
            total: 0,
        }
    ],
    rebaja: '',
    porciento: '',
    disponible: '',
    images: [
        {
            id: 0,
            uri: '',
        },
    ],
    tallas: [
        {
            id: 0,
            name: '',
        },
    ],
    tipo: {
        id: 0,
        name: '',
    },
    tamanio: {
        id: 0,
        name: '',
    },
    color: {
        id: 0,
        name: '',
    },
};

const listsChecksForm = {
    tallas: [

    ],
    tipos: [],

    tamanios: [],

    colores: [

    ],
};



const initialError = {
    name: '',
    precio: '',
    cant19: '',
    cant20: '',
    files: '',
    tallas: '',
    tipo: '',
    tamanio: '',
    color: '',
    porciento: '',
};

const initialErrorCatalogMessage = '';

export const useProducts = () => {

    const [products, dispatch] = useReducer(productsReducer, initialProducts);

    const [visibleDetails, setVisibleDetails] = useState(false);

    const [productSelected, setProductSelected] = useState(initialProductsForm);

    const [errors, setErrors] = useState(initialError);

    const [errorCatalogMessage, setErrorCatalogMessage] = useState(initialErrorCatalogMessage);

    const [formlist, setFormlist] = useState(listsChecksForm);

    const { login, clearSessionExpired } = useContext(AuthContext);

    const navigate = useNavigate();


    const getProducts = async () => {
        const result = await findAll();
        dispatch({
            type: 'loadingProducts',
            payload: result.data,
        });
    }

    const handleAddProduct = async (product, id) => {

        if (!login.isAdmin) return;

        console.log(id);
        let response;
        try {
            if (id === 0) {
                response = await save(product);
            } else {
                response = await update(product);
            }
            dispatch({
                type: (product.id === 0) ? 'addProduct' : 'updateProduct',
                payload: response.data,
            });
            Swal.fire(
                (id === 0) ? 'Producto Creado' : 'Producto Actualizado',
                (id === 0) ? 'El Producto a sido creado con exito' : 'El Producto se Actualizo exitosamente',
                "success"
            );
            //optimizeGarbage();
            //handlerCloseDetails();
            navigate('/products');
        } catch (error) {
            if (error.response && error.response.status == 400) {
                setErrors(error.response.data);
                console.log(errors);
            } else if (error.response && error.response.status == 500) {
                setErrors(error.response.data);
            } else if (error.response?.status == 401) {
                clearSessionExpired();
                Swal.fire("El tiempo de sesion a finalizado");
            }
            else {
                console.error(error);
                throw error;
            }
        }
    }

    const handleRemoveProduct = async (id) => {

        if (!login.isAdmin) return;

        Swal.fire({
            title: "Esta seguro que desea eliminar?",
            text: "Este producto se eliminara permanentemente!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await remove(id);
                    dispatch({
                        type: 'removeProduct',
                        payload: id,
                    });
                    Swal.fire({
                        title: "Eliminado!",
                        text: "El producto a sido eliminado exitosamente.",
                        icon: "success"
                    });
                    navigate('/products');
                } catch (error) {
                    if (error.response?.status == 401) {
                        clearSessionExpired();
                        Swal.fire("El tiempo de sesion a finalizado");
                    } else if (error.response?.status == 404) {
                        console.log("elemento eliminado exitosamente");
                        navigate('/products');
                    } else {
                        throw error;
                    }
                }
            }
        });
    }

    const getProdsByDetails = async (details) => {
        setErrorCatalogMessage(initialErrorCatalogMessage);
        try {
            const result = await findByDetails(details);
            console.log(result.data);
            dispatch({
                type: 'loadProdsByDetails',
                payload: result.data,
            });
            navigate('/products/catalog');
        } catch (error) {
            if (error.response && error.response?.status === 404) {
                setErrorCatalogMessage('producto no encontrado');
                console.log(errorCatalogMessage);
            } else {
                console.log('NOT_FOUND')
                throw error;
            }
        }
    }

    const getFindCatalogItems = (details) => {
        if (sessionStorage.getItem('filters') != null) {
            sessionStorage.removeItem('filters');
        } 
        sessionStorage.setItem('filters', JSON.stringify(details));
        console.log(JSON.parse(sessionStorage.getItem('filters')));
        
         navigate('/products/catalog');
    }


    const getProductsRebajas = async () => {
        //setErrorCatalogMessage(initialErrorCatalogMessage);
        try {
            const result = await findRebajas();
            console.log(result.data);
            dispatch({
                type: 'findProdRebajas',
                payload: result.data,
            });
            navigate('/products/catalog');
        } catch (error) {
            if (error.response && error.response?.status === 404) {
                setErrorCatalogMessage('producto no encontrado');
                console.log(errorCatalogMessage);
            } else {
                console.log('NOT_FOUND')
                throw error;
            }
        }
    }

    const getListSelectsForm = async () => {
        const result = await findListsForm();
        setFormlist(result.data);
    }

    const handlerProductSelected = (product) => {
        setVisibleDetails(true);
        setProductSelected({ ...product });
    }

    const handlerOpenDetails = () => {
        setVisibleDetails(true);
    }

    const handlerCloseDetails = () => {
        setVisibleDetails(false);
        setProductSelected(initialProductsForm);

    }

    const handleCloseForms = () => {
        setProductSelected(initialProductsForm);
        setErrors(initialError);
        navigate('/products');

    }

    const clearCatalogDetails = () => {
        setErrorCatalogMessage(initialErrorCatalogMessage);
        navigate('/products');
    }

    /*const optimizeGarbage = async () => {
        if (!login.isAdmin) return;
        try {
            const response = await optimizeGarbageFiles();
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
    }*/

    return {
        products,
        visibleDetails,
        productSelected,
        initialProductsForm,
        errors,
        formlist,
        errorCatalogMessage,
        handleAddProduct,
        handleRemoveProduct,
        handlerProductSelected,
        handlerOpenDetails,
        handlerCloseDetails,
        handleCloseForms,
        getProducts,
        getProdsByDetails,
        getFindCatalogItems,
        getProductsRebajas,
        getListSelectsForm,
        clearCatalogDetails,
        //optimizeGarbage,
    }

}