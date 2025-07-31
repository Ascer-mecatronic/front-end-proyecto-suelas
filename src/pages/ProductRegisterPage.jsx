import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context/ProductContext'
import { useParams } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';

export const ProductRegisterPage = () => {

  const {products = [], initialProductsForm} = useContext(ProductContext);

  const [productSelected, setProductSelected] =  useState(initialProductsForm);

  const {id} = useParams();

  useEffect(() => {
    if(id){ //validacion para el caso de registrar debido a que ni el id en la ruta ni el users en los props son incluidos
        const product = products.find(p => p.id == id) || initialProductsForm;//se previene un error por undefined debido a que 
        setProductSelected(product); //el useParams gatilla el estado del id tambien en la ruta de registrar
    }
},[id])

  return (
    <div className=" container-fluid">
        <header className='row justify-content-center'>
          <div className='col-12 text-center py-4'>
            <h4>{productSelected.id > 0 ? 'Editar' : 'Registrar'} producto</h4>
          </div>
        </header>

            <main className="row">
                
                    <ProductForm productSelected={productSelected}/>
                
            </main>
        </div>
  )
}
