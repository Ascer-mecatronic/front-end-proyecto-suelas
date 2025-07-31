import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context/ProductContext';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:8080/tallas';
const BASE_URL2 = 'http://localhost:8080/product/optimize';

const initForm = {
    id: 0,
    name: '',
}

const initError = {
    date: '',
    error: '',
    message: '',
    status: '',
}

const initIsModal = false;

export const AttributesFormModal = () => {

    const { getListSelectsForm, formlist, optimizeGarbage } = useContext(ProductContext);

    useEffect(() => {
        getListSelectsForm();
    }, []);

    const [tallaForm, setTallaForm] = useState(initForm);

    const [ismodal, setIsmodal] = useState(initIsModal);

    const [error, setError] = useState(initError);

    const { id, name } = tallaForm;

    const onAddTalla = () => {
        setIsmodal(true);
    }
    const offAddTalla = () => {
        setIsmodal(false);
    }

    const optimizeFolderFiles = () => {
        /*axios.get(BASE_URL2).then((res) => {
            console.log('elementos reciclados' + res.data);
        }).catch(err => {
            if (err.response && err.response.data.status == 500) {
                console.log(err.response.data.message);
            } else {
                console.log(err);
                throw err;
            }
        });*/
        optimizeGarbage();
    }

    const handleRemoveAttribute = (id) => {
        setError(initError);

        Swal.fire({
            title: "Esta seguro que desea eliminar?",
            text: "Cuidado, se eliminara de todos los productos asociados!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${BASE_URL}/${id}`).then((res) => {
                    console.log('Eliminado con exito->' + res.data);
                    getListSelectsForm();
                    Swal.fire({
                        title: "Atributo Eliminado",
                        text: "La talla a sido eliminada con exito",
                        icon: "success",
                    });
                }).catch(err => {
                    if (err.response && err.response.data.status == 500) {
                        setError(err.response.data);
                        console.log(err);
                        Swal.fire({
                            title: err.response.data.error,
                            text: err.response.data.message,
                            icon: "error",
                        });
                    } else {
                        console.log(err);
                        throw err;
                    }
                })
            }
        });

    }

    const onInputChange = ({ target }) => {
        setTallaForm({
            ...tallaForm,
            [target.name]: target.value,
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        try {
            axios.post(BASE_URL, tallaForm).then((res) => {
                console.log('Creado con exito-> ' + res.data);
                Swal.fire({
                    title: "Atributo creado",
                    text: "Nueva talla creada con exito",
                    icon: "success"
                });
                setTallaForm(initForm);
                setIsmodal(false);
                getListSelectsForm();
            })
        } catch (error) {
            if (error.response && error.response.status == 400) {
                setError(error.response.data);
                console.log(error);
            } else {
                console.error(error);
                throw error;
            }
        }
    }

    return (
        <>

            <h3 className='m-3 p-2'>Tallas:</h3>
            <table className="table table-striped table-hover table-sm table-bordered border-dark text-center m-3 p-2">

                <thead>
                    <tr className="table-dark">
                        <th>ID</th>

                        <th>Talla:</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        formlist.tallas.map((t) => (
                            <tr key={t.id}>
                                <td>{t.id}</td>
                                <td>{t.name}</td>
                                <td><button
                                    className='btn btn-danger btn-sm'
                                    type='button'
                                    onClick={() => handleRemoveAttribute(t.id)}
                                >Eliminar</button></td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
            <button className='btn btn-primary btn-sm' type='button' onClick={onAddTalla}>Agregar</button>
            <button className='btn btn-warning btn-sm' type='button' onClick={optimizeFolderFiles}>Optimizar</button>


            {ismodal ?
                <div className="abrir-modal animacion fadeIn">
                    <div className="modal " style={{ display: "block" }} tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Agregar Talla:
                                    </h5>
                                    <button
                                        className="btn-close"
                                        onClick={offAddTalla}
                                        data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(event) => onSubmit(event)} >
                                        <input
                                            type="hidden"
                                            name="id"
                                            id='id'
                                            value={id}
                                        />

                                        <div className='form-floating'>
                                            <input
                                                className="form-control w-75"
                                                placeholder="name"
                                                type="text"
                                                name="name"
                                                id='floatingName'
                                                value={name}
                                                onChange={(event) => onInputChange(event)}
                                            />
                                            <label htmlFor='floatingName'>Nombre... </label>
                                        </div>
                                        <p className="text-danger">{error?.name}</p>
                                        <br />
                                        <div>
                                            <button
                                                className="btn btn-primary"
                                                type='submit'
                                            >Enviar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : ''}
        </>
    )
}
