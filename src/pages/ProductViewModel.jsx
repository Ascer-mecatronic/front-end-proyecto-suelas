import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context/ProductContext';
import { useParams } from 'react-router-dom';
import { ViewModel } from '../components/ViewModel';


export const ProductViewModel = () => {

    const { products, getProducts } = useContext(ProductContext);

    const { id } = useParams();

    useEffect(() => {
        getProducts();
    }, []);


    return (
        <div className='container-fluid'>

            <main className='row'>

                {products.map(prod => {
                    if (prod.id == id) {
                        return (
                            <div key={prod.id}>
                                <ViewModel
                                    id={prod.id}
                                    name={prod.name}
                                    precio={prod.precio}
                                    cantidad={prod.cantidad}
                                    images={prod.images}
                                    tallas={prod.tallas}
                                    tipo={prod.tipo}
                                    tamanio={prod.tamanio}
                                    color={prod.color}
                                />
                            </div>
                        )
                    }
                    else{
                        return(<div key={prod.id}>
                        <h2>Articulo no encontrado</h2>
                        </div>)
                    }
                })}

            </main>

        </div>
    )
}
