import React, { useContext, useEffect, useState } from 'react'
import { MediaContext } from '../context/MediaContext'

export const PageForm = ({ pageSelected }) => {

    const {
        initialPageForm,
        handlerAddPages,
        errorsPage,
        handleCloseFrm,
    } = useContext(MediaContext);

    const [pageForm, setPageForm] = useState(initialPageForm);

    useEffect(() => {
        if (pageSelected) {
            setPageForm(pageSelected);
        }
    }, [pageSelected], [])

    const onSubmit = (event) => {
        event.preventDefault();
        const frm = document.getElementById('formElement');
        const formData = new FormData(frm);
        handlerAddPages(formData, pageForm.id);
    }


    return (
        <>
            <section className='col-6'>

                <div className='container'>
                    <form className='row' id='formElement' name='formElement' onSubmit={(event) => onSubmit(event)} encType="multipart/form-data">
                        <div className='col-8'>

                            <input
                                type="hidden"
                                name="id"
                                id='id'
                                value={pageForm.id}
                            />
                            <p className="text-danger">{errorsPage?.id}</p>

                            <div className='form-floating'>
                                <input
                                    className="form-control form-control-sm w-75"
                                    placeholder="name"
                                    type="text"
                                    name="name"
                                    id='name'
                                />
                                <label htmlFor='name'>Nombre... </label>
                            </div>
                            <p className="text-danger">{errorsPage?.name}</p>
                            <br />

                            <div className='form-floating  mb-3'>
                                <input
                                    className="form-control w-75"
                                    type="file"
                                    name="imageOne"
                                    id='imageOne'
                                />
                                <label htmlFor='imageOne'>Imagen Primcipal: </label>
                            </div>
                            <p className="text-danger">{errorsPage?.imageOne}</p>
                            <br />

                            <div className='form-floating  mb-3'>
                                <input
                                    className="form-control w-75"
                                    type="file"
                                    name="imageTwo"
                                    id='imageTwo'
                                />
                                <label htmlFor='imageTwo'>Imagen Dos: </label>
                            </div>
                            <p className="text-danger">{errorsPage?.imageTwo}</p>
                            <br />

                            <div className='form-floating  mb-3'>
                                <input
                                    className="form-control w-75"
                                    type="file"
                                    name="imageThree"
                                    id='imageThree'
                                />
                                <label htmlFor='imageThree'>Imagen Tres: </label>
                            </div>
                            <p className="text-danger">{errorsPage?.imageThree}</p>
                            <br />

                            <div className='form-floating mb-3'>
                                <textarea className='form-control w-75'
                                    placeholder='Agregue texto aqui...'
                                    rows={4}
                                    name='textOne'
                                    id='textOne'
                                />
                                <label htmlFor='textOne'>Texto uno</label>
                            </div>
                            <p className='text-danger'>{errorsPage?.textOne}</p>
                            <br />

                            <div className='form-floating mb-3'>
                                <textarea className='form-control w-75'
                                    placeholder='Agregue texto aqui...'
                                    rows={4}
                                    name='textTwo'
                                    id='textTwo'
                                />
                                <label htmlFor='textTwo'>Texto Dos</label>
                            </div>
                            <p className='text-danger'>{errorsPage?.textTwo}</p>
                            <br />

                            <div className='form-floating  mb-3'>
                                <input
                                    className="form-control w-75"
                                    type="file"
                                    name="filesOne"
                                    id='filesOne'
                                    multiple
                                />
                                <label htmlFor='filesOne'>Coleccion uno: </label>
                            </div>
                            <p className="text-danger">{errorsPage?.filesOne}</p>
                            <br />

                            <div className='form-floating  mb-3'>
                                <input
                                    className="form-control w-75"
                                    type="file"
                                    name="filesTwo"
                                    id='filesTwo'
                                    multiple
                                />
                                <label htmlFor='filesTwo'>Coleccion dos: </label>
                            </div>
                            <p className="text-danger">{errorsPage?.filesTwo}</p>
                            <br />

                        </div>
                        <div className='col-2'>
                            <button
                                className="btn btn-primary"
                                type='submit'
                            >Enviar
                            </button>
                        </div>
                    </form>
                    <button
                        className="btn btn-primary my-4 "
                        onClick={handleCloseFrm}
                    >Home</button>
                </div>

            </section>

            {pageForm.id !== 0 ?
                <aside className=' col-4 mx-3 px-3'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>{pageSelected ? 'Pagina a editar ID: ' + pageForm.id : ''}</h5>
                            <ul>
                                <li>{pageSelected ? 'Nombre de la pagina: ' + pageForm.name : ''}</li>
                                <li>imagen Principal: <img src={"../../imgpublicy/" + pageForm.imageOne} width='100' /></li>
                                <li>imagen Dos: <img src={"../../imgpublicy/" + pageForm.imageTwo} width='100' /></li>
                                <li>imagen Tres: <img src={"../../imgpublicy/" + pageForm.imageThree} width='100' /></li>
                                <li>{pageSelected ? 'texto uno: ' + pageForm.textOne : ''}</li>
                                <li>{pageSelected ? 'texto dos: ' + pageForm.textTwo : ''}</li>

                                {pageSelected ? <><li> Coleccion uno:

                                    {pageForm.collectionOne.map(i => (
                                        <ul key={i.id}>
                                            <li><img src={"../../collectionOne/" + i.uri} width='100' /></li>
                                        </ul>
                                    ))}

                                </li></> : ''}

                                {pageSelected ? <><li> Coleccion dos:

                                    {pageForm.collectionTwo.map(i => (
                                        <ul key={i.id}>
                                            <li><img src={"../../collectionTwo/" + i.uri} width='100' /></li>
                                        </ul>
                                    ))}

                                </li></> : ''}
                            </ul>
                        </div>
                    </div>
                </aside>
                : ''}
        </>
    )
}
