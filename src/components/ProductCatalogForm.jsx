

import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context/ProductContext';


const initialSet = {
  talla: "",
  tipo: "",
  tamanio: "",
  color: "",
};

const initiAlertmsg = '';

export const ProductCatalogForm = () => {

  const {
    getProdsByDetails,
    getListSelectsForm,
    formlist,
    clearCatalogDetails,
  } = useContext(ProductContext);

  const [detailsFind, setDetailsFind] = useState(initialSet);

  const[alertForm, setAlertForm] = useState(initiAlertmsg);

  const {talla, tipo, tamanio, color} = detailsFind;

  useEffect(() => {
    getListSelectsForm();
    return () => {
      setDetailsFind(initialSet);
    }
  }, [])

  const clearCatalog = () => {
    setAlertForm(initiAlertmsg);
    setDetailsFind(initialSet);
    clearCatalogDetails();
  }

  const onInputChange = ({ target }) => {
    setDetailsFind({
      ...detailsFind,
      [target.name]: target.value,
    });
    console.log(detailsFind);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setAlertForm(initiAlertmsg);
    if(color === '' && talla === '' && tamanio === '' && tipo === ''){
      setAlertForm('agregue campo de busqueda');
    }else{
      console.log(detailsFind);
    getProdsByDetails(detailsFind);
    }
  }


  return (
    <>


      <form onSubmit={(event) => onSubmit(event)}>

        <div className='form-floating'>
        <select
          className="form-select select-busqueda"
          onChange={(event) => onInputChange(event)}
          name="talla"
          id='floatingTalla'
          aria-label="form-select-sm example">

          <option value={""} >--seleccione una opcion--</option>
          {
            formlist.tallas.map((t) => (
              <option key={t.id} value={t.name}> {t.name} </option>
            ))
          }

        </select>
          <label htmlFor='floatingTalla'>Talla: </label>
        </div>


          <div className='form-floating'>
        <select
          className="form-select  select-busqueda"
          onChange={(event) => onInputChange(event)}
          name="tipo"
          id='floatingTipo'
          aria-label="form-select-sm example">
          
           <option value={""} >--seleccione una opcion--</option>
          {
            formlist.tipos.map((t) => (
              <option key={t.id} value={t.name}> {t.name} </option>
            ))
          }
        </select>
            <label htmlFor='floatingTipo'>Tipo: </label>
          </div>


          <div className='form-floating'>
        <select
          className="form-select select-busqueda"
          onChange={(event) => onInputChange(event)}
          name="tamanio"
          id='floatingTamanio'
          aria-label="form-select-sm example">

          <option value={""} >--seleccione una opcion--</option>
          {
            formlist.tamanios.map((t) => (
              <option key={t.id} value={t.name}> {t.name} </option>
            ))
          }
        </select>
            <label htmlFor='floatingTamanio'>Tamaño:</label>
          </div>


          <div className='form-floating'>
        <select
          className="form-select select-busqueda"
          onChange={(event) => onInputChange(event)}
          name="color"
          id='floatingColores'
          aria-label="form-select-sm example">

          <option value={""} >--seleccione una opcion</option>
          {
            formlist.colores.map((c) => (
              <option key={c.id} value={c.name}> {c.name} </option>
            ))
          }
        </select>
            <label htmlFor='floatingColores'>Color:</label>
          </div>

        <button
          className="btn btn-primary px-2 m-2"
          type="submit"
        >buscar
        </button>

      </form>
           {alertForm ? <p className="text-danger">{alertForm}</p> : ''}
      <div className="col-8">
        <button className='btn btn-primary' onClick={clearCatalog}>limpiar</button>
      </div>

    </>
  )
}
